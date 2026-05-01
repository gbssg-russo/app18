function login(req, res) {
  res.status(200).json({ status: 'success', message: 'Login endpoint' });
}

function register(req, res) {
  res.status(201).json({ status: 'success', message: 'Register endpoint' });
}

module.exports = { login, register };
