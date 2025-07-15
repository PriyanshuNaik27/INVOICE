import express from 'express';
import { parseQuery } from '../controllers/aiController.js';
const router = express.Router();
router.post('/parse', parseQuery);
export default router;
