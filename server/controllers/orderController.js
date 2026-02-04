import { appendToSheet } from '../services/googleSheetsService.js';
import { db } from '../services/firebase.js';
import { collection, addDoc } from "firebase/firestore";

export const submitOrder = async (req, res) => {
  try {
    const { packageDetails, projectDescription, contactInfo } = req.body;
    
    const timestamp = new Date().toISOString();
    const pageType = 'order';
    
    // 1. Save to Firebase
    await addDoc(collection(db, "orders"), {
      packageDetails,
      projectDescription,
      contactInfo,
      submittedAt: timestamp
    });

    // 2. Append to Google Sheets
    await appendToSheet('Orders', [
      timestamp,
      pageType,
      packageDetails?.name || '',
      packageDetails?.price || '',
      projectDescription || '',
      contactInfo?.name || '',
      contactInfo?.email || '',
      contactInfo?.phone || ''
    ]);

    res.status(200).json({ 
      success: true, 
      message: 'Order placed and saved successfully.' 
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
