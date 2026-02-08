import express from 'express';
import validateSyncKey from '../middleware/syncKey.js';
import { getContactsSync, getOrdersSync, getReviewsSync } from '../controllers/syncController.js';

const router = express.Router();

router.use(validateSyncKey);

router.get('/contacts', getContactsSync);
router.get('/orders', getOrdersSync);
router.get('/reviews', getReviewsSync);

export default router;
