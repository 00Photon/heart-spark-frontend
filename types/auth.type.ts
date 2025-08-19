export interface LoginPayload {
  email: string;
  password: string;
}
export type User = {
  id: number | string; 
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  timezone: string;
  avatar?: string; 
};

export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  user: {
    id: number | string; 
    email: string;
    name?: string; 
    firstName?: string;
    lastName?: string;
    role: string;
    status?: string; 
  };
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    status: string;
  };
}

export interface RecoveryPayload {
  email: string;
}

export interface RecoveryResponse {
  success: boolean;
  message: string;
}

export interface VerificationPayload {
  email: string;
  otp: string;
}

export interface AccountVerificationPayload {
  token: string;
}

export interface AccountVerificationResponse {
  success: boolean;
  message: string;
}