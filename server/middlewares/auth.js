import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('auth-token') || req.body.token || req.query.token;
  if (!token) {
    res.status(401).send('Access denied. No token provided');
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err) {
      res.status(400).send('Invalid token provided');
    }
  }
};

export default auth;
