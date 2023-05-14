import jwt from 'jsonwebtoken';
import Auth from '../models/auth.js';
const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Auth.findById(decoded.id).select(
        '-password -token -confirmado'
      );
      return next();
    } catch (error) {
      const e = new Error('Token no valido.');
      return res.status(403).json({ susecces: false, msg: e.message });
    }
  }
  if (!token) {
    const error = new Error('Token no valido o inexistente.');
    return res.status(403).json({ susecces: false, msg: error.message });
  }
  next();
};

export default checkAuth;
