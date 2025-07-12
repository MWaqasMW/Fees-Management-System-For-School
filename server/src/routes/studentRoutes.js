import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsWithFees,
  getPaymentStatus,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/class-fees', getStudentsWithFees);
router.get('/payments', getPaymentStatus);
router.get('/:id', getStudentById);
router.post('/create', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);



export default router;
