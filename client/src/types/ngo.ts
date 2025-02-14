import { User } from "./user";

export interface NGO {
  _id?: string;
  name: string;
  description: string;
  location?: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  createdBy?: string | User;
}
