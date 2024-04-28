import { PasswordMode } from '../../enums/passwordMode';

export interface GeneratePasswordProps {
  passwordMode: PasswordMode;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}
