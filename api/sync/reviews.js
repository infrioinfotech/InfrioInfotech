// Vercel Serverless Function: /api/sync/reviews
// Fetches reviews from Firebase Firestore for Google Apps Script sync

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-sync-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/infrio-infotech/databases/(default)/documents/reviews';
    const response = await fetch(firestoreUrl);

    if (!response.ok) {
      return res.status(200).json([]);
    }

    const data = await response.json();
    const documents = data.documents || [];

    const formatted = documents.map(doc => {
      const fields = doc.fields || {};
      return {
        id: doc.name ? doc.name.split('/').pop() : '',
        createdAt: doc.createTime,
        author: fields.author ? fields.author.stringValue : (fields.name ? fields.name.stringValue : ''),
        rating: fields.rating ? fields.rating.stringValue : '5',
        comment: fields.comment ? fields.comment.stringValue : (fields.message ? fields.message.stringValue : '')
      };
    });

    return res.status(200).json(formatted);
  } catch (err) {
    return res.status(200).json([]);
  }
}
