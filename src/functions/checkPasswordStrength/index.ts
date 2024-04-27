import { PasswordStrengthResult } from '@interfaces/passwordStrengthResult';

export const checkPasswordStrength = (
  password: string
): PasswordStrengthResult => {
  let score = 0;

  if (password.length >= 20) {
    score += 1;
  }

  if (password.length >= 25) {
    score += 1;
  }

  if (password.length >= 35) {
    score += 1;
  }

  if (password.length >= 45) {
    score += 1;
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  }

  if (/[!@#$%^&*()_+\-=[\]{}|;:'",.<>?]/.test(password)) {
    score += 1;
  }

  let strength: 'Weak' | 'Moderate' | 'Strong';

  if (score < 3) {
    strength = 'Weak';
  } else if (score < 5) {
    strength = 'Moderate';
  } else {
    strength = 'Strong';
  }

  return {
    strength: strength,
  };
};
