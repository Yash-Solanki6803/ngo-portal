import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCampaigns } from "@/src/api/campaignService";
import { CampaignCard } from "../../../components";

function Campaigns() {
  const user = useSelector((state) => state.user);
  const [campaigns, setCampaigns] = useState([]);
  const ngoId = user.userInfo._id;
  useEffect(() => {
    if (!ngoId) return;
    async function fetchCampaigns() {
      try {
        const data = await getCampaigns(ngoId);
        setCampaigns(data);
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
}

export default Campaigns;
