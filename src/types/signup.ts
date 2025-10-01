export interface SignupFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordRecoveryValues {
  email: string;
}

export interface CreatePasswordValues {
  newPassword: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface VerificationFormValues {
  otp: string[];
}