import api, { handleApiError } from "./api";
import { APIResponse } from "../types/api";
import { Campaign } from "../types/campaign";
import { NGO } from "../types/ngo";

export interface GetCampaignsResponse extends APIResponse {
  data: {
    message: string;
    campaigns: Campaign[];
  };
}

export interface CreateCampaignResponse extends APIResponse {
  data: {
    message: string;
    campaign: Campaign;
  };
}

export interface GetCampaignsResponse extends APIResponse {
  data: {
    message: string;
    campaigns: Campaign[];
  };
}

export const createCampaign = async (
  campaign: Campaign
): Promise<CreateCampaignResponse> => {
  try {
    const response = api.post("/campaigns/create", campaign);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

//get campaigns of an ngo
export const getCampaigns = async (
  ngoId: NGO["_id"]
): Promise<GetCampaignsResponse> => {
  try {
    const response = api.get(`/campaigns?ngoId=${ngoId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
