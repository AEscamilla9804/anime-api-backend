import Favorite from "../models/Favorites.js";

const addFavorite = async (req, res) => {
    const anime = new Favorite(req.body);
    anime.user = req.user._id;

    try {
        await anime.save();
        res.json({ msg: 'Added to favorites' });
    } catch (error) {
        if (error.code === 11000) {
            const e = new Error('Anime is already in your Favorites');
            res.status(400).json({ msg: e.message });
        } else {
            const e = new Error('Unable to add to Favorites');
            res.status(400).json({ msg: e.message });
        }
    }
}

const getFavorites = async (req, res) => {
    const userId = req.user._id;

    // Query params for page and result limit
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        // Get total user favorites
        const totalFavorites = await Favorite.countDocuments({ user: userId });

        const favorites = await Favorite.find({ user: userId })
            .skip(skip)
            .limit(limit);

        res.json({
            favorites,
            totalPages: Math.ceil(totalFavorites / limit),
            currentPage: page
        });
    } catch (error) {
        const e = new Error('Failed to fetch favorites');
        res.status(500).json({ msg: e.message });
    }
}

const deleteFavorite = async (req, res) => {
    const userId = req.user._id;
    const mal_id = req.params.id;

    try {
        const deleted = await Favorite.findOneAndDelete({ mal_id, user: userId });
        if (!deleted) return res.status(404).json({ msg: 'Favorite not found' });
        res.json({ msg: 'Successfully removed from favorites'});
    } catch (error) {
        const e = new Error('Failed to delete favorite');
        res.status(500).json({ msg: e.message });
    }
}

export {
    addFavorite,
    getFavorites,
    deleteFavorite
}