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

// Helper to timeout a promise
const withTimeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Operation timed out')), ms))
  ]);
};

export const submitReview = async (req, res) => {
  try {
    // Expect JSON payload with photoUrl already uploaded
    let { name, message, rating, photoUrl, reviewText } = req.body;

    // Handle case where frontend sends 'content' or 'reviewText' instead of 'message'
    // The prompt says "Must accept: name, rating, reviewText, photoURL"
    const reviewMessage = message || reviewText || req.body.content;

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
      // Give Google Sheets 4 seconds max, otherwise proceed
      await withTimeout(appendToSheet('Reviews', [
        [
          cleanName,
          ratingNum,
          cleanMessage,
          photoUrl || '',
          new Date().toISOString()
        ]
      ]), 4000);
    } catch (sheetError) {
      console.error('Warning: Google Sheet append failed or timed out:', sheetError.message);
      // Do not fail the request if sheet fails
    }

    res.status(201).json({ success: true, review: newReview });

  } catch (error) {
    console.error("Review API error:", error);
    res.status(500).json({ error: error.message });
  }
};
