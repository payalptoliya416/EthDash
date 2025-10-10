import { apiRequest } from "./requests";
import { API } from "./endpoints";
import { adminapiRequest } from "./adminapirequest";
import { userpiRequest } from "./userapirequest";

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
  is_google?: boolean;
  is_facebook?: boolean;
}

export interface SignupResponse {
  message: string;
  access_token?: string; // optional if your backend returns JWT;
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
    is_2fa_enabled?: boolean;
    is_2fa_verify?: number;
  };
   "2_fa"?: boolean; 
   email: string;
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
  access_token?: string;
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

export interface AdminLogin {
  email : string;
  password: string;
}
export interface AdminEthWallet {
   id: number;
  email : string;
  case_id: string;
}

export interface AdminWalletData {
   status: "success" | "error";
  message: string;
  data: AdminEthWallet;
}
interface Disable2FAResponse {
  status: "success" | "error";
  message?: string;
}
interface Country {
  id: number;
  country_name: string;
}

interface CountryGetRes {
  status: "success" | "error"; 
  data: Country[];
}

export interface CreatedBankDetail {
  country: number;              
  account_number: string;      
  sort_code?: string;         
  transit_number?: string;     
  institution_number?: string;  
  iban?: string;               
  swift_code?: string;         
}
interface CountryGetRes {
  status: "success" | "error"; 
  message: string;
}

export const authService = {
  signup: (data: SignupData) =>
    apiRequest<SignupResponse>(API.REGISTER, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data: LoginData) =>
    apiRequest<LoginResponse>(API.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  logout: () => apiRequest(API.LOGOUT, { method: "POST" }),
  socialSignup: (data: SocialSignupData) =>
    apiRequest(API.SOCIAL_SIGNUP, {
      method: "POST",
      body: JSON.stringify(data),
    }),
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
    apiRequest<ResetPasswordResponse>(API.RESETPASS, {
      method: "POST",
      body: JSON.stringify(data),
    }),

   disable2FA: () =>
    userpiRequest<Disable2FAResponse>(API.DISABLE2FA, {
      method: "POST",
    }),

    // --bannk 
    countryGet: () =>
    userpiRequest<CountryGetRes>(API.COUNTRY_GET, {
      method: "GET",
    }),
    submitBankDetails: (data : CreatedBankDetail) =>
    userpiRequest<CountryGetRes>(API.CREATE_BANK_ACCOUNT, {
      method: "POST",
      body: JSON.stringify(data),
    }),

    // ---admin side 

      adminLogin: (data: AdminLogin) =>
    apiRequest<LoginResponse>(API.ADMINLOGIN, {
      method: "POST",
      body: JSON.stringify(data),
    }),
    adminEthWallet:  (data: AdminEthWallet) => adminapiRequest<AdminWalletData>(API.ADMINETHWALLET, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
