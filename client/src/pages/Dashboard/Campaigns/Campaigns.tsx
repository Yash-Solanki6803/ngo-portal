import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCampaigns } from "@/api/campaignService";
import { CampaignCard } from "@/components";
import { RootState } from "@/redux/store";
import { Campaign } from "@/types/campaign";

export const Campaigns: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const ngoId = user.userInfo?._id;
  useEffect(() => {
    if (!ngoId) return;
    async function fetchCampaigns() {
      try {
        const response = await getCampaigns(ngoId);
        const { data } = response;
        setCampaigns(data.campaigns);
      } catch (error) {
        console.error("Error fetching campaigns: ", error);
      }
    }

    fetchCampaigns();
  }, []);

  return (
    <section className=" w-full h-full px-10 py-6 overflow-y-auto">
      <h2 className="text-3xl h-1/6 font-semibold border-b pb-6">Campaigns</h2>
      <div className="h-5/6 overflow-y-auto flex flex-wrap gap-4 py-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} {...campaign} />
        ))}
      </div>
    </section>
  );
};
