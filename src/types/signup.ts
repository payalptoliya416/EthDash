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
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface VerificationFormValues {
  email: string;
  otp: string[];
}

export interface VerificationValue {
  otp: string[];
  email : string
}