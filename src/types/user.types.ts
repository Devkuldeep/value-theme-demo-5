/**
 * User & Authentication Types
 * Represents enterprise construction personnel, role levels, and session metadata in the Indian context.
 */

export type UserRole = 'PROJECT_DIRECTOR' | 'SITE_ENGINEER' | 'CHIEF_ESTIMATOR' | 'SAFETY_OFFICER' | 'CLIENT_ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  role: UserRole;
  avatarUrl: string;
  department: string;
  location: string; // e.g. "Bengaluru HQ", "Mumbai Regional Office"
  reraLicenseNo?: string;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  identifier: string; // Email or Mobile (+91)
  password?: string;
  otp?: string;
  rolePreset?: UserRole;
}
