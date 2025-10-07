import { apiRequest } from "./requests";
import { API } from "./endpoints";

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface SocialSignupData {
  first_name: string;
  last_name: string;
  email: string | null | undefined;
  is_google?: any;
  is_facebook?: any;
}

export interface SignupResponse {
  message: string;
  token?: string; // optional if your backend returns JWT;
  status: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}
export interface LoginResponse {
  message: string;
  access_token?: string;
  status: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
  is_google?: boolean;
  is_facebook?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  status: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  success: string;
  token?: string;
}
export interface ResetPasswordData {
  email: string;
  password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: string;
}

export const authService = {
  signup: (data: SignupData) => apiRequest<SignupResponse>(API.REGISTER, {
    method: "POST",
    body: JSON.stringify(data),
  }),
  login: (data: LoginData) => apiRequest<LoginResponse>(API.LOGIN, { method: "POST", body: JSON.stringify(data) }),
  logout: () => apiRequest(API.LOGOUT, { method: "POST" }),
  socialSignup: (data: SocialSignupData) => apiRequest(API.SOCIAL_SIGNUP, { method: "POST", body: JSON.stringify(data) }),
    forgotPassword: (data: ForgotPasswordData) =>
    apiRequest<ForgotPasswordResponse>(API.FORGOT_PASSWORD, {
      method: "POST",
      body: JSON.stringify(data),
    }),
    verifyOtp: (data: VerifyOtpData) =>
    apiRequest<VerifyOtpResponse>(API.VERIFY_OTP, {
      method: "POST",
      body: JSON.stringify(data),
    }),
     resetPassword: (data: ResetPasswordData) =>
    apiRequest<ResetPasswordResponse>("/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

};
