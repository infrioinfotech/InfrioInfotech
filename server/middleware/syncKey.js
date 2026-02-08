export default function validateSyncKey(req, res, next) {
  const key = req.headers['x-sync-key'];
  const expected = process.env.SYNC_API_KEY;
  if (!expected || !key || key !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
