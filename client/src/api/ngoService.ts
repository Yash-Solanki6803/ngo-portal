import api, { handleApiError } from "./api";
import { APIResponse } from "../types/api";
import { NGO } from "../types/ngo";
import { User } from "@/types/user";

export interface NgoResponse extends APIResponse {
  data: {
    message: string;
    ngo?: NGO;
    user?: User;
  };
}

//Create NGO
export const createNgo = async (data: NGO): Promise<NgoResponse> => {
  try {
    const response = api.post("/ngo/create", data);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

//Delete NGO
export const deleteNgo = async (_id: NGO["_id"]): Promise<NgoResponse> => {
  try {
    const response = api.delete(`/ngo/delete/${_id}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

//Update NGO
export const updateNgo = async (data: NGO): Promise<NgoResponse> => {
  try {
    const response = api.put(`/ngo/update/${data._id}`, data);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

//Get NGO data from ngoId
export const getNgoById = async (_id: NGO["_id"]): Promise<NgoResponse> => {
  try {
    const response = api.get(`/ngos/${_id}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
