// Dummy input
// {
//     "name": "Tree Plantation Drive",
//     "description": "A campaign to plant 500 trees in the city park to promote environmental awareness.",
//     "location": "Ahmedabad, Gujarat",
//     "startDate": "2025-03-15T09:00:00Z",
//     "endDate": "2025-03-20T18:00:00Z",
//     "status": "upcoming"
//   }

import { useState } from "react";
import { createCampaign } from "../../../../api/campaignService";

function CreateCampaign() {
  const initialCampaignState = {
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
  };
  const [campaign, setCampaign] = useState(initialCampaignState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(campaign);
    if (
      !campaign.name ||
      !campaign.description ||
      !campaign.location ||
      !campaign.startDate ||
      !campaign.endDate
    ) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    } else {
      try {
        const data = await createCampaign(campaign);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="w-full px-10 py-6 flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <h3 className="text-3xl font-semibold">Create Campaign</h3>
        <p className="text-red-500 text-lg -mb-4">{error}</p>
      </div>
      <form className=" h-full bg-gray-200 shadow-xl rounded-xl px-10 py-4 flex flex-col items-end">
        <div className="w-full border-b py-4 flex  items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="name">
            Name
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="text"
            id="name"
            name="name"
            value={campaign.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full border-b py-4 flex  items-start">
          <label className="w-1/5 text-xl font-light" htmlFor="description">
            Description
          </label>
          <textarea
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            rows={10}
            id="description"
            name="description"
            value={campaign.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full border-b py-4 flex  items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="location">
            Location
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="text"
            id="location"
            name="location"
            value={campaign.location}
            onChange={handleChange}
          />
        </div>
        <div className="flex  w-full border-b">
          <div className="w-1/2 py-4 flex items-center ">
            <label className="w-2/5 text-xl font-light" htmlFor="startDate">
              Start Date
            </label>
            <input
              className="px-6 py-2 w-3/5 text-xl font-light focus-within:outline-none rounded-md"
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={campaign.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2  py-4 flex items-center">
            <label className="w-2/5 ml-10 text-xl font-light" htmlFor="endDate">
              End Date
            </label>
            <input
              className="px-6 py-2 w-3/5 text-xl font-light focus-within:outline-none rounded-md"
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={campaign.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Status */}
        <div className="w-full border-b py-4 flex  items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="status">
            Status
          </label>
          <select
            className="px-10 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            id="status"
            name="status"
            value={campaign.status}
            onChange={handleChange}
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          className="border bg-gray-900 text-white px-6 py-4 rounded-lg"
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          Create Campaign
        </button>
      </form>
    </section>
  );
}

export default CreateCampaign;
