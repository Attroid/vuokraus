const bcrypt = require('bcryptjs');

const SALT = 10;

export function hashPasswordSync(password) {
  return bcrypt.hashSync(password, SALT);
}

export function hashPassword(password) {
  return bcrypt.hash(password, SALT);
}

export function checkPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}
