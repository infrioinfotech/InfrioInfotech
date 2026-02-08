import { adminDb as db } from '../services/firebaseAdmin.js';
import { sendUserAutoReply, sendInternalNotification } from '../services/mailer.js';

export const submitOrder = async (req, res) => {
  try {
    const { packageDetails, projectDescription, contactInfo } = req.body;
    
    const timestamp = new Date().toISOString();
    const pageType = 'order';
    
    // 1. Save to Firebase
    await db.collection("orders").add({
      packageDetails,
      projectDescription,
      contactInfo,
      submittedAt: timestamp
    });

    res.status(200).json({ 
      success: true, 
      message: 'Order placed and saved successfully.' 
    });

    // 2. Fire-and-forget emails
    const summary = {
      Package: packageDetails?.name,
      Price: packageDetails?.price,
      ProjectDescription: projectDescription,
      Name: contactInfo?.name,
      Email: contactInfo?.email,
      Phone: contactInfo?.phone,
      SubmittedAt: timestamp,
    };
    sendUserAutoReply({
      toEmail: contactInfo?.email,
      toName: contactInfo?.name,
      subject: 'We received your order request',
      summary,
    });
    sendInternalNotification({
      subject: `New Order – ${packageDetails?.name || 'Package'}`,
      summary,
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
