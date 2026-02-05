import express from 'express';
import { submitContact } from '../controllers/contactController.js';
import { submitOrder } from '../controllers/orderController.js';
import { getReviews, submitReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/contact', submitContact);
router.post('/order', submitOrder);

// Review routes
router.get('/reviews', getReviews);
router.post('/reviews', submitReview);

export default router;
