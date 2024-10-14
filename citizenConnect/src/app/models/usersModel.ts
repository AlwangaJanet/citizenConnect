export interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Suspended' | 'Inactive';
  isApproved: boolean;
  role: 'Citizen' | 'Official' | 'Admin';
}

export interface Official {
  id: string;
  email: string;
  name: string;
  isApproved: 'Approved' | 'Pending';
}

export interface AddUser {
  name: string;
  email: string;
  password: string;
  role: 'Citizen' | 'Official' | 'Admin';
}

export interface RegisterResponse {
  message: string;
  isApproved: boolean;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
