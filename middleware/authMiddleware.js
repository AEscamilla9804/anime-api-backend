import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
    // Validate JWT
    const authorization = req.headers.authorization;
    let token;

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select(
                "-password -token -confirmed"
            );

            return next();
        } catch (error) {
            const e = new Error('Invalid Token');
            res.status(403).json({ msg: e.message });
        }
    }

    if (!token) {
        const error = new Error('Invalid or Inexistent Token');
        res.status(403).json({ msg: error.message });
    }

    next();
}

export default checkAuth;