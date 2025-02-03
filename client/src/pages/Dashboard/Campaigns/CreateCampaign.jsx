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

  return (
    <section className="w-full px-10 py-6 flex flex-col gap-6">
      <h3 className="text-3xl font-semibold">Create Campaign</h3>
      <form className=" h-full bg-gray-100 shadow-xl rounded-xl px-10 py-4 flex flex-col items-end">
        <div className="w-full border-b py-4 flex gap-4 items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="name">
            Name
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="text"
            id="name"
            value={campaign.name}
            onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
          />
        </div>
        <div className="w-full border-b py-4 flex gap-4 items-start">
          <label className="w-1/5 text-xl font-light" htmlFor="description">
            Description
          </label>
          <textarea
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            rows={10}
            id="description"
            value={campaign.description}
            onChange={(e) =>
              setCampaign({ ...campaign, description: e.target.value })
            }
          />
        </div>
        <div className="w-full border-b py-4 flex gap-4 items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="location">
            Location
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="text"
            id="location"
            value={campaign.location}
            onChange={(e) =>
              setCampaign({ ...campaign, location: e.target.value })
            }
          />
        </div>
        <div className="w-full border-b py-4 flex gap-4 items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="startDate">
            Start Date
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="datetime-local"
            id="startDate"
            value={campaign.startDate}
            onChange={(e) =>
              setCampaign({ ...campaign, startDate: e.target.value })
            }
          />
        </div>
        <div className="w-full  py-4 flex gap-4 items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="endDate">
            End Date
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="datetime-local"
            id="endDate"
            value={campaign.endDate}
            onChange={(e) =>
              setCampaign({ ...campaign, endDate: e.target.value })
            }
          />
        </div>
        <button
          className="border bg-gray-900 text-white px-6 py-4 rounded-lg"
          type="submit"
        >
          Create Campaign
        </button>
      </form>
    </section>
  );
}

export default CreateCampaign;
