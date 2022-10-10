function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidPassword(password) {
  return /^[a-zA-Z0-9]{6,30}$/.test(password);
}

export { isValidEmail, isValidPassword };
