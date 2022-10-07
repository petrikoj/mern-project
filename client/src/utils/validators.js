function isValidEmail(email) {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

function isValidPassword(password) {
  return /^[a-zA-Z0-9]{6,30}$/.test(password);
}

export { isValidEmail, isValidPassword };
