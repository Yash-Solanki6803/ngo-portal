import api, { handleApiError } from "./api";
import { APIResponse } from "../types/api";
import { User, UserRole } from "@/types/user";

export const changeUserRole = async (
  email: User["email"],
  role: UserRole
): Promise<APIResponse> => {
  try {
    const response = api.post("/user/change-role", { email, role });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
