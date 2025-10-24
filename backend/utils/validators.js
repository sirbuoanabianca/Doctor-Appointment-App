import validator from 'validator';

export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new Error('Please enter a valid email');
  }
  return true;
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  return true;
};

export const validatePhone = (phone) => {
  if (phone && !validator.isMobilePhone(phone)) {
    throw new Error('Please enter a valid phone number');
  }
  return true;
};
