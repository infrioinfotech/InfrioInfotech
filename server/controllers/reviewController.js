import { db } from '../services/firebase.js';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { appendToSheet } from '../services/googleSheetsService.js';

export const getReviews = async (req, res) => {
  try {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Handle Firestore timestamp safely
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt || new Date())
      };
    });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const submitReview = async (req, res) => {
  try {
    // Expect JSON payload with photoUrl already uploaded
    let { name, message, rating, photoUrl } = req.body;

    // Handle case where frontend sends 'content' instead of 'message' or vice versa
    // The prompt says "Must accept: name, message, rating, photoUrl"
    // The frontend currently sends 'content'. I will align frontend to send 'message' as per prompt, 
    // but handle 'content' here just in case.
    const reviewMessage = message || req.body.content;

    if (!name || !reviewMessage || !rating) {
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
      message: cleanMessage, // Storing as 'message' to match prompt
      content: cleanMessage, // Storing as 'content' as well for backward compatibility if needed
      rating: ratingNum,
      photoUrl: photoUrl || '',
      createdAt: serverTimestamp(),
      role: 'Client'
    };

    // 1. Write review to Firestore
    const docRef = await addDoc(collection(db, 'reviews'), reviewData);
    
    // Prepare response data
    const newReview = {
      id: docRef.id,
      ...reviewData,
      createdAt: new Date() // Return current time as approximation for immediate UI update
    };

    // 2. Append row to Google Sheet (Optional but good to have)
    try {
      await appendToSheet('Reviews', [
        [
          new Date().toISOString(),
          cleanName,
          ratingNum,
          cleanMessage,
          photoUrl || ''
        ]
      ]);
    } catch (sheetError) {
      console.error('Error appending to Google Sheet:', sheetError);
      // Do not fail the request if sheet fails
    }

    res.status(201).json({ success: true, review: newReview });

  } catch (error) {
    console.error("Review API error:", error);
    res.status(500).json({ error: error.message });
  }
};
