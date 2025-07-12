import express from 'express';
import { getMonthlyReport, getYearlyReport } from '../controllers/reportController.js';
const router = express.Router();

router.get('/monthly', getMonthlyReport);
router.get('/yearly', getYearlyReport);

export default router;
