import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';
import animeRoutes from './routes/animeRoutes.js';

const app = express();

dotenv.config();
connectDB();

// CORS allowed domains
const allowedDomains = [
  'https://aniverse-explorer.netlify.app',
  'http://localhost:5173' // dev
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, same server)
    if (!origin || allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/animes', animeRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});