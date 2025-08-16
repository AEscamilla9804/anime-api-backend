import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
    mal_id: {
        type: Number
    },
    img: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    rank: {
        type: Number
    },
    score: {
        type: Number
    },
    episodes: {
        type: Number
    },
    status: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Prevents the same anime being added twice by the same user
favoriteSchema.index({ mal_id: 1, user: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;