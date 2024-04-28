import { PasswordStrengthResult } from '@interfaces/passwordStrengthResult';

export const checkPasswordStrength = (
  password: string
): PasswordStrengthResult => {
  let score = 0;

  if (password.length >= 16) {
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

  if (/[A-Z]/.test(password)) {
    score++;
  }

  if (/[a-z]/.test(password)) {
    score++;
  }

  if (/[0-9]/.test(password)) {
    score++;
  }

  if (/[!@#$%^&*()_+\-=[\]{}|;:'",.<>?]/.test(password)) {
    score++;
  }

  if (password.length < 12 && score >= 0) {
    score--;
  }

  if (score <= 3) {
    return { strength: 'Weak' };
  }

  if (score < 5) {
    return { strength: 'Moderate' };
  }

  return { strength: 'Strong' };
};
