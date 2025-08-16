import express from 'express';
import { 
    register,
    profile,
    confirm,
    authenticate,
    forgotPassword,
    tokenCheck,
    newPassword,
    updateProfile,
    updatePassword  
} from '../controllers/userController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Area
router.post('/sign-up', register);
router.get('/confirm/:token', confirm);
router.post('/login', authenticate);
router.post('/forgot-password', forgotPassword);    // Generates a token for confirmation
router.route('/forgot-password/:token').get(tokenCheck).post(newPassword);  // Verifies user id and sets a new password

// Private Area
router.get('/profile', checkAuth, profile);
router.put('/profile/change-password', checkAuth, updatePassword);
router.put('/profile/:id', checkAuth, updateProfile);

export default router;