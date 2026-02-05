
import admin from 'firebase-admin';
import 'dotenv/config';

const getPrivateKey = () => {
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!privateKey) return undefined;

  // Handle literal \n
  privateKey = privateKey.replace(/\\n/g, '\n');

  // Handle single-line keys
  if (!privateKey.includes('\n') && privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    privateKey = privateKey
      .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
      .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----');
  }
  return privateKey;
};

if (!admin.apps.length) {
  try {
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
    let storageBucket = process.env.VITE_FIREBASE_STORAGE_BUCKET;

    // Ensure bucket name is in the correct format: "<project-id>.appspot.com"
    if (!storageBucket || !storageBucket.includes('appspot.com')) {
      storageBucket = `${projectId}.appspot.com`;
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
        privateKey: getPrivateKey(),
      }),
      storageBucket,
    });
    console.log('Firebase Admin Initialized');
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
  }
}

export const bucket = admin.storage().bucket();
export const adminDb = admin.firestore();
export default admin;
