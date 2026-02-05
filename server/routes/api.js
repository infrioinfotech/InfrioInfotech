import express from 'express';
import multer from 'multer';
import { submitContact } from '../controllers/contactController.js';
import { submitOrder } from '../controllers/orderController.js';
import { getReviews, submitReview } from '../controllers/reviewController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/contact', submitContact);
router.post('/order', submitOrder);

// Review routes
router.get('/reviews', getReviews);
router.post('/reviews', upload.single('photo'), submitReview);

export default router;
