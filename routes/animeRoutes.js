import express from 'express';
import { 
    fetchAnimes,
    fetchAnimeById
} from '../controllers/animesController.js';

const router = express.Router();

router.get('/', fetchAnimes);
router.get('/:id', fetchAnimeById);

export default router;