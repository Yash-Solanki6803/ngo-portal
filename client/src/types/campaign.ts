// {
//     "message": "Campaign created successfully",
//     "campaign": {
//         "name": "Tree Plantation Drive",
//         "description": "A campaign to plant 500 trees in the city park to promote environmental awareness.",
//         "createdBy": "67a04f22576862ab605aa82a",
//         "location": "Ahmedabad, Gujarat",
//         "startDate": "2025-03-15T09:00:00.000Z",
//         "endDate": "2025-03-20T18:00:00.000Z",
//         "status": "upcoming",
//         "volunteers": [],
//         "_id": "67a9cf833475c81d893a7ecc",
//         "createdAt": "2025-02-10T10:05:55.299Z",
//         "__v": 0
//     }
// }

export interface Campaign {
  _id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  createdBy: string;
  volunteers: string[];
  createdAt: string;
}

export enum CampaignStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
}
