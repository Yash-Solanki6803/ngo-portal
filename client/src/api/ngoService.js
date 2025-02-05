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

//Update NGO
export const updateNgo = async (data) => {
  try {
    const response = await api.put(`/ngo/update/${data.id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//Get NGO data from ngoId
export const getNgoById = async (id) => {
  try {
    const response = await api.get(`/ngos/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
