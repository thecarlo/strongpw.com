import { PasswordMode } from '../../enums/passwordMode';

export interface GeneratePasswordProps {
  passwordMode: PasswordMode;
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}
