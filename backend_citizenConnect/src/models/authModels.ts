export interface User {
  UserID: string;
  Name: string;
  Email: string;
  PasswordHash: string;
  Role: string;
  IsApproved: number;
  IsDeleted: number;
  CreatedAt: Date;
}



export interface Payload {
  id: string
  name: string
  role: 'Citizen' | 'Official' | 'Admin'
  iat: number;
  exp: number;
}

