import axios from 'axios';

const fetchAnimes = async (req, res) => {
    try {
        const { page = 1, limit = 10, type, min_score, status } = req.query;

        const config = {
            params: {
                page,
                limit,
                type,
                min_score,
                status
            }
        }

        const url = 'https://api.jikan.moe/v4/anime';

        const { data } = await axios(url, config);
        res.json(data);
    } catch (error) {
        const e = new Error('Error fetching anime list');
        res.status(500).json({ msg: e.message })
    }
}

const fetchAnimeById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data } = await axios(`https://api.jikan.moe/v4/anime/${id}`);
        res.json(data);
    } catch (error) {
        const e = new Error('Error fetching anime');
        res.status(500).json({ msg: e.message })
    }
}

export {
    fetchAnimes,
    fetchAnimeById
}