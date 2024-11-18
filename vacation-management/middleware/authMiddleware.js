const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Incluye ID y rol del usuario en la solicitud
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
