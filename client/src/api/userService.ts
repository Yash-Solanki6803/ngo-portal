import api, { handleApiError } from "./api";
import { APIResponse } from "../types/api";

export const changeUserRole = async (email, role): Promise<APIResponse> => {
  try {
    const response = api.post("/user/change-role", { email, role });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
