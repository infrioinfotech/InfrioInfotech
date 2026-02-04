import { appendToSheet } from '../services/googleSheetsService.js';
import { db } from '../services/firebase.js';
import { collection, addDoc } from "firebase/firestore";

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    const timestamp = new Date().toISOString();
    const pageType = 'contact';

    // 1. Save to Firebase
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      phone,
      service,
      message,
      submittedAt: timestamp
    });
    
    // 2. Append to Google Sheets
    await appendToSheet('Contacts', [
      timestamp,
      pageType,
      name || '',
      email || '',
      phone || '',
      service || '',
      message || ''
    ]);

    res.status(200).json({ 
      success: true, 
      message: 'Inquiry received and saved successfully.' 
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
