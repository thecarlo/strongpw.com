import { PasswordStrengthResult } from '@interfaces/passwordStrengthResult';

export const checkPasswordStrength = (
  password: string
): PasswordStrengthResult => {
  let score = 0;

  let hasAll = false;

  let hasSpecial = false;

  let hasLower = false;

  let hasUpper = false;

  let hasNumbers = false;

  if (password.length > 12) {
    score++;
  }

  if (password.length >= 15) {
    score++;
  }

  if (password.length >= 17) {
    score++;
  }

  if (password.length >= 18) {
    score++;
  }

  if (password.length >= 20) {
    score++;
  }

  if (password.length >= 25) {
    score++;
  }

  if (password.length >= 30) {
    score++;
  }

  if (password.length >= 35) {
    score++;
  }

  if (/[A-Z]/.test(password)) {
    hasUpper = true;

    score++;
  }

  if (/[a-z]/.test(password)) {
    hasLower = true;

    score++;
  }

  if (/[0-9]/.test(password)) {
    hasNumbers = true;

    score++;
  }

  if (/[!@#$%^&*()_+\-=[\]{}|;:'",.<>?~]/.test(password)) {
    hasSpecial = true;

    score++;
  }

  if (hasSpecial && hasLower && hasUpper && hasNumbers) {
    hasAll = true;
  }

  if (password.length >= 12 && hasAll) {
    score++;
  }

  if (password.length <= 12 && score >= 0) {
    score--;
  }

  if (score <= 3) {
    return { strength: 'Weak' };
  }

  if (score < 5) {
    return { strength: 'Moderate' };
  }

  if (score <= 5) {
    return { strength: 'Strong' };
  }

  return { strength: 'Very Strong' };
};
