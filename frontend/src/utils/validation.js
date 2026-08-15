export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

export const validateNicPassport = (id) => {
  return id && id.trim().length >= 6;
};
