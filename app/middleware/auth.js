function requireAuth(req, res, next) {
  // Hier später JWT oder Session-basierte Authentifizierung einbauen.
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  }

  // Beispiel: Bearer token prüfen
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'Invalid token format' });
  }

  req.user = { id: 'demo-user' };
  next();
}

module.exports = { requireAuth };
