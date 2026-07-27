// Vercel Serverless Function: /api/sync/orders
// Fetches orders from Firebase Firestore for Google Apps Script sync

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-sync-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/infrio-infotech/databases/(default)/documents/orders';
    const response = await fetch(firestoreUrl);

    if (!response.ok) {
      // If collection doesn't exist yet, return empty array
      return res.status(200).json([]);
    }

    const data = await response.json();
    const documents = data.documents || [];

    const formatted = documents.map(doc => {
      const fields = doc.fields || {};
      return {
        id: doc.name ? doc.name.split('/').pop() : '',
        createdAt: doc.createTime,
        customer: fields.customer ? fields.customer.stringValue : (fields.name ? fields.name.stringValue : ''),
        email: fields.email ? fields.email.stringValue : '',
        service: fields.service ? fields.service.stringValue : '',
        status: fields.status ? fields.status.stringValue : 'Pending'
      };
    });

    return res.status(200).json(formatted);
  } catch (err) {
    return res.status(200).json([]);
  }
}
