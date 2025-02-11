export interface Campaign {
  _id?: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  createdBy?: string;
  volunteers?: string[];
  createdAt?: string;
}

export enum CampaignStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
}
