import api from "./api";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Assuming API sends back user details and token
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};

export const fetchUserFromToken = async () => {
  try {
    const response = await api.get("/auth/user", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong!";

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
