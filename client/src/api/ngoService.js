import api from "./api";

//Create NGO
export const createNgo = async (data) => {
  try {
    const response = await api.post("/ngo/create", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//Delete NGO
export const deleteNgo = async (id) => {
  try {
    const response = await api.delete(`/ngo/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
