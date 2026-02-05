import { db } from '../services/firebase.js';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import admin, { bucket, adminDb } from '../services/firebaseAdmin.js';
import { appendToSheet } from '../services/googleSheetsService.js';

export const getReviews = async (req, res) => {
  try {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Timestamp to date string if needed, or let frontend handle it
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }));
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const submitReview = async (req, res) => {
  try {
    let { name, content, rating } = req.body;
    const file = req.file;

    if (!name || !content || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validation & Sanitization
    name = name.trim();
    content = content.trim();
    
    if (content.length > 500) {
        return res.status(400).json({ error: 'Review content exceeds 500 characters' });
    }
    
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    let photoUrl = '';

    // 1. Upload image to Firebase Storage (Admin SDK)
    if (file) {
      try {
        const fileName = `reviews/${Date.now()}_${file.originalname}`;
        const fileUpload = bucket.file(fileName);
        
        await fileUpload.save(file.buffer, {
          metadata: {
            contentType: file.mimetype,
          },
        });

        await fileUpload.makePublic();
        
        // Construct public URL
        photoUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        return res.status(500).json({ error: 'Image upload failed' });
      }
    }

    const reviewData = {
      name,
      content,
      rating: Number(rating),
      image: photoUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      role: 'Client'
    };

    // 2. Write review to Firestore (Admin SDK)
    const docRef = await adminDb.collection('reviews').add(reviewData);
    
    // Prepare response data
    const newReview = {
      id: docRef.id,
      ...reviewData,
      createdAt: new Date()
    };

    // 3. Append row to Google Sheet
    try {
      await appendToSheet('Reviews', [
        [
          new Date().toISOString(),
          name,
          rating,
          content,
          photoUrl
        ]
      ]);
    } catch (sheetError) {
      console.error('Error appending to Google Sheet:', sheetError);
    }

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
};
