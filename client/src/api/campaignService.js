import api from "./api";

//create a campaign
export const createCampaign = async (campaign) => {
  try {
    const response = await api.post("/campaigns/create", campaign);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong");
  }
};

//get campaigns of an ngo
export const getCampaigns = async (ngoId) => {
  try {
    const response = await api.get(`/campaigns?ngoId=${ngoId}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong");
  }
};
