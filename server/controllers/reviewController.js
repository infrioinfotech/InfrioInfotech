import { adminDb as db } from '../services/firebaseAdmin.js';
import { FieldValue } from 'firebase-admin/firestore';
import { sendUserAutoReply, sendInternalNotification } from '../services/mailer.js';

export const getReviews = async (req, res) => {
  try {
    console.log('GET /api/reviews request received');
    const querySnapshot = await db.collection('reviews').orderBy('createdAt', 'desc').get();
    
    if (querySnapshot.empty) {
      console.log('No reviews found');
      return res.json([]);
    }

    const reviews = querySnapshot.docs.map(doc => {
      const data = doc.data();
      let createdAtIso = new Date().toISOString();

      // Handle Firestore Timestamp
      if (data.createdAt && typeof data.createdAt.toDate === 'function') {
        createdAtIso = data.createdAt.toDate().toISOString();
      } else if (data.createdAt instanceof Date) {
        createdAtIso = data.createdAt.toISOString();
      } else if (typeof data.createdAt === 'string') {
        createdAtIso = data.createdAt;
      }

      return {
        id: doc.id,
        name: data.name || 'Anonymous',
        rating: Number(data.rating) || 5,
        message: data.message || data.reviewText || '',
        photoUrl: data.photoUrl || null,
        createdAt: createdAtIso
      };
    });

    console.log(`Returning ${reviews.length} reviews`);
    res.json(reviews);
  } catch (error) {
    console.error('SERVER ERROR in getReviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
};

export const submitReview = async (req, res) => {
  console.log('POST /api/reviews request received', req.body);
  try {
    // Expect JSON payload with photoUrl already uploaded
    let { name, message, rating, photoUrl, reviewText } = req.body;

    // Handle case where frontend sends 'content' or 'reviewText' instead of 'message'
    const reviewMessage = message || reviewText || req.body.content;

    if (!name || !reviewMessage || !rating) {
      console.warn('Missing required fields:', { name, reviewMessage, rating });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validation & Sanitization
    const cleanName = name.trim();
    const cleanMessage = reviewMessage.trim();
    
    if (cleanMessage.length > 500) {
        return res.status(400).json({ error: 'Review content exceeds 500 characters' });
    }
    
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const reviewData = {
      name: cleanName,
      message: cleanMessage,
      rating: ratingNum,
      photoUrl: photoUrl || null,
      createdAt: FieldValue.serverTimestamp(),
      role: 'Client'
    };

    // 1. Write review to Firestore
    console.log('Writing to Firestore...');
    const docRef = await db.collection('reviews').add(reviewData);
    console.log('Firestore write success, ID:', docRef.id);
    
    // Prepare response data (use current date for immediate response)
    const newReview = {
      id: docRef.id,
      name: cleanName,
      message: cleanMessage,
      rating: ratingNum,
      photoUrl: photoUrl || null,
      createdAt: new Date().toISOString()
    };

    res.status(201).json({ success: true, review: newReview });

    // Fire-and-forget emails
    const summary = {
      Name: cleanName,
      Rating: ratingNum,
      Message: cleanMessage,
      PhotoUrl: photoUrl || '',
      SubmittedAt: new Date().toISOString(),
    };
    sendUserAutoReply({
      toEmail: '', // optional if you collect reviewer email
      toName: cleanName,
      subject: 'Thank you for your review',
      summary,
    });
    sendInternalNotification({
      subject: 'New Review Submitted',
      summary,
    });

  } catch (error) {
    console.error("SERVER ERROR in submitReview:", error);
    res.status(500).json({ error: error.message });
  }
};
