
import express from 'express';
import { getAlluser, createUser, deleteUser,  getSingleUser, updateUser, userLogin, userRegister } from '../controllers/userController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';
import { userMiddleware } from '../middlewares/userMiddlewares.js';






//init router
const router = express.Router();

// route
router.route('/').get( adminMiddleware, getAlluser).post(authMiddleware,createUser);
router.route('/:id').get(authMiddleware,getSingleUser).delete(userMiddleware,deleteUser).put(userMiddleware,updateUser).patch(userMiddleware,updateUser)

// user Auth
router.post('/login', userLogin)
router.post('/register', userRegister)


// Exports routers
export default router;
