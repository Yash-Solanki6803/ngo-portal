export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  ngoId?: string;
  campaignsJoined: string[];
}

export enum UserRole {
  Dev = "dev",
  NGO = "ngo",
  VOLUNTEER = "volunteer",
}
