import express from 'express';
import { submitContact } from '../controllers/contactController.js';
import { submitOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/contact', submitContact);
router.post('/order', submitOrder);

export default router;
