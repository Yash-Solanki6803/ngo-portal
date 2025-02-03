import api from "./api";

export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/auth/users");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};

// export const registerUser = async (name, email, password) => {
//     try {
//       const response = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });
//       return response;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Something went wrong!";
//       throw errorMessage;
//     }
//   };
