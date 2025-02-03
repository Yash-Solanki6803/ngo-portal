import api from "./api";

export const changeUserRole = async (email, role) => {
  try {
    const response = await api.post("/user/change-role", { email, role });
    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong!";
    throw errorMessage;
  }
};
