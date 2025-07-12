import express from 'express';
import {
  getFees,
  getFeeByClass,
  createFee,
  updateFee,
  deleteFee,
} from '../controllers/feeController.js';

const router = express.Router();

router.get('/', getFees);
router.get('/:classId', getFeeByClass);
router.post('/', createFee);
router.put('/:classId', updateFee);
router.delete('/:classId', deleteFee);

export default router;
