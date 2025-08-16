import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { 
    addFavorite,
    getFavorites, 
    deleteFavorite
} from '../controllers/favoritesController.js';

const router = express.Router();

// Private Area (requires authenticacion)
router.post('/add', checkAuth, addFavorite);
router.get('/fetch', checkAuth, getFavorites);
router.delete('/delete/:id', checkAuth, deleteFavorite);

export default router;