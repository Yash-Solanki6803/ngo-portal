import { Campaign } from "@/types/campaign";

export const CampaignCard: React.FC<Campaign> = ({
  name,
  description,
  location,
  startDate,
  endDate,
  status,
  volunteers = [],
}) => {
  return (
    <div className="bg-gray-800 p-4  rounded-lg  text-gray-200  w-96 h-52 flex flex-col justify-between cursor-pointer shadow-2xl">
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        {/* Trim the description to 150 characters */}
        <p className="text-sm">
          {description.length > 150
            ? description.slice(0, 150) + "..."
            : description}
        </p>
      </div>
      <div className="flex justify-between mt-4 text-gray-400">
        <div className="w-2/3">
          <p className="">{location}</p>
          <p className="">
            Starting on: {new Date(startDate).toLocaleDateString()}
          </p>
          <p className="">
            Ending on: {new Date(endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="w-1/3">
          <p className={`text-green-600`}>{status.toUpperCase()}</p>
          <p className="">Volunteers: {volunteers.length}</p>
        </div>
      </div>
    </div>
  );
};
