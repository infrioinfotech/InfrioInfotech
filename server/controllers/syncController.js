import { adminDb as db } from '../services/firebaseAdmin.js';

const toIso = (val) => {
  try {
    if (!val) return null;
    if (typeof val?.toDate === 'function') return val.toDate().toISOString();
    if (val instanceof Date) return val.toISOString();
    if (typeof val === 'string') return new Date(val).toISOString();
    return null;
  } catch {
    return null;
  }
};

export const getContactsSync = async (req, res) => {
  try {
    const snap = await db.collection('contacts').orderBy('submittedAt', 'asc').get();
    const data = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        createdAt: toIso(d.submittedAt) || new Date().toISOString(),
        ...d,
      };
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to read contacts', details: e.message });
  }
};

export const getOrdersSync = async (req, res) => {
  try {
    const snap = await db.collection('orders').orderBy('submittedAt', 'asc').get();
    const data = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        createdAt: toIso(d.submittedAt) || new Date().toISOString(),
        ...d,
      };
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to read orders', details: e.message });
  }
};

export const getReviewsSync = async (req, res) => {
  try {
    const snap = await db.collection('reviews').orderBy('createdAt', 'asc').get();
    const data = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        createdAt: toIso(d.createdAt) || new Date().toISOString(),
        ...d,
      };
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to read reviews', details: e.message });
  }
};
