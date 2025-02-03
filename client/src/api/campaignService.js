import api from "./api";

//create a campaign
export const createCampaign = async (campaign) => {
  try {
    const response = await api.post("/campaigns", campaign);
    return response.data;
  } catch (error) {
    throw error;
  }
};
