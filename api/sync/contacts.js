// Vercel Serverless Function: /api/sync/contacts
// Fetches contacts from Firebase Firestore collections with clean numeric IDs (1, 2, 3...)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-sync-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url1 = "https://firestore.googleapis.com/v1/projects/infrio-infotech/databases/(default)/documents/Infrio-Website-Contact%27s-Data";
    const url2 = "https://firestore.googleapis.com/v1/projects/infrio-infotech/databases/(default)/documents/contacts";

    const [res1, res2] = await Promise.all([
      fetch(url1).catch(() => null),
      fetch(url2).catch(() => null)
    ]);

    let docs1 = [];
    let docs2 = [];

    if (res1 && res1.ok) {
      const data1 = await res1.json();
      docs1 = data1.documents || [];
    }

    if (res2 && res2.ok) {
      const data2 = await res2.json();
      docs2 = data2.documents || [];
    }

    const allDocs = [...docs1, ...docs2];
    const seen = new Set();
    const formattedContacts = [];
    let counter = 1;

    for (const doc of allDocs) {
      const rawId = doc.name ? doc.name.split('/').pop() : '';
      if (!rawId || seen.has(rawId)) continue;
      seen.add(rawId);

      const fields = doc.fields || {};
      const firstName = fields.firstName ? fields.firstName.stringValue : '';
      const lastName = fields.lastName ? fields.lastName.stringValue : '';
      const fullName = fields.name ? fields.name.stringValue : (firstName + ' ' + lastName).trim();

      const numId = (fields.id && fields.id.integerValue) 
        ? Number(fields.id.integerValue) 
        : (fields.id && fields.id.stringValue && !isNaN(fields.id.stringValue))
          ? Number(fields.id.stringValue)
          : (rawId && !isNaN(rawId)) 
            ? Number(rawId) 
            : counter;

      counter++;

      formattedContacts.push({
        id: numId,
        createdAt: fields.createdAt 
          ? (fields.createdAt.timestampValue || fields.createdAt.stringValue || doc.createTime) 
          : (fields.submittedAt ? fields.submittedAt.stringValue : doc.createTime),
        name: fullName || 'Anonymous',
        email: fields.email ? fields.email.stringValue : '',
        phone: fields.phone ? fields.phone.stringValue : '',
        service: fields.service ? fields.service.stringValue : 'Website Design',
        message: fields.message ? fields.message.stringValue : '',
        submittedAt: fields.submittedAt ? fields.submittedAt.stringValue : (doc.createTime || new Date().toISOString())
      });
    }

    // Sort by numeric ID ascending (1, 2, 3...)
    formattedContacts.sort((a, b) => a.id - b.id);

    return res.status(200).json(formattedContacts);
  } catch (err) {
    console.error("Error in /api/sync/contacts:", err);
    return res.status(500).json({ error: err.message });
  }
}
