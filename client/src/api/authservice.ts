import api, { handleApiError } from "./api";
import { AxiosResponse, AxiosError, Axios } from "axios";
import { User } from "../types/user";
import { APIResponse } from "../types/api";

export interface AuthUserResponse extends APIResponse {
  data: {
    token?: string;
    message: string;
    user?: User;
  };
}

export interface AuthUsersResponse extends APIResponse {
  data: {
    message: string;
    users?: User[];
  };
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthUserResponse> => {
  try {
    const response = api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthUserResponse> => {
  try {
    const response = api.post("/auth/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchUserFromToken = async (): Promise<AuthUserResponse> => {
  try {
    const response = api.get("/auth/user", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    const errorMessage =
      (error as AxiosError<{ message: string }>)?.response?.data?.message ||
      "Something went wrong!";

    // Check if the token is expired
    if (errorMessage === "Token has expired") {
      // Remove the expired token from localStorage
      localStorage.removeItem("auth_token");

      // Optionally redirect to the login page or show a modal/message
      window.location.href = "/login"; // or redirect to login route
    }

    throw errorMessage;
  }
};

export const fetchAllUsers = async (): Promise<AuthUsersResponse> => {
  try {
    const response = api.get("/auth/users");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
