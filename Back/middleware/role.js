const requireRole = (requiredRole) => (req, res, next) => {
  if (req.currentUser.accountType !== requiredRole) {
    return res.status(401).json({ error: 'Unauthorized: insufficient privileges.' });
  }
  next();
};

export default requireRole;