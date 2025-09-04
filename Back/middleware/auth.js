import jwtUtil from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const bearer = req.headers.authorization;
  const accessToken = bearer ? bearer.split(' ')[1] : null;
  if (!accessToken) return res.status(403).json({ error: 'Access denied. Token missing.' });
  try {
    req.currentUser = jwtUtil.verify(accessToken, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Access denied. Token invalid.' });
  }
};

export default authenticateUser;
