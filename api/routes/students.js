
import express from 'express';
import { createStudent, deleteStudent, getAllStudents, getSinglestudent, updateStudent } from '../controllers/studentsController.js';



//init router
const router = express.Router();

// route
router.route('/').get(getAllStudents).post(createStudent);
router.route('/:id').get(getSinglestudent).delete(deleteStudent).put(updateStudent).patch(updateStudent)



// Exports routers
export default router;
