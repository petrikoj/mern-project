function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidPassword(password) {
  return /^[a-zA-Z0-9]{6,30}$/.test(password);
}

function isValidUsername(username) {
  return /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(username);
}

export { isValidEmail, isValidPassword, isValidUsername };
