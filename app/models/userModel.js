// Platzhalter für späteren Datenbankanschluss
const users = [];

function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

module.exports = { users, findUserByEmail };
