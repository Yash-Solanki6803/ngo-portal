import api from "./api";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Assuming API sends back user details and token
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};

export const fetchUserFromCookie = async () => {
  try {
    const response = await api.get("/auth/user");
    return response.data; // Assuming API sends back user details and token
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};
