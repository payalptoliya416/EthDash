export const API = {
  // --user side 
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  SOCIAL_SIGNUP: "/register",
  FORGOT_PASSWORD:"/forgot-password",
  VERIFY_OTP: "/verify-otp",
  RESETPASS: '/reset-password',

  DISABLE2FA: '/disable-2fa',
   USER_HISTORY: '/dashboard/history',
   USDT_BALANCE:"/dashboard/usdt-balance",
  // --bannk 
  COUNTRY_GET:'/country',
  CREATE_BANK_ACCOUNT:'/bank/create',

  

  // --admin side
  ADMINLOGIN: '/admin/login',
  ADMINETHWALLET : '/admin/eth-wallet',
  HISTROY : '/admin/users/history?page=1&per_page=10',
  ACTIVE_CLIENT : '/admin/all-clients',
 
};
