import { adminDb as db } from '../services/firebaseAdmin.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    const timestamp = new Date().toISOString();
    const pageType = 'contact';

    // 1. Save to Firebase
    await db.collection("contacts").add({
      name,
      email,
      phone,
      service,
      message,
      submittedAt: timestamp
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Inquiry received and saved successfully.' 
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
