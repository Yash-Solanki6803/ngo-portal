// {
//     "_id": "67a0b37a9cef2693781500b0",
//     "name": "Tree Plantation Drive",
//     "description": "A campaign to plant 500 trees in the city park to promote environmental awareness.",
//     "createdBy": "67a04f22576862ab605aa82a",
//     "location": "Ahmedabad, Gujarat",
//     "startDate": "2025-03-15T09:00:00.000Z",
//     "endDate": "2025-03-20T18:00:00.000Z",
//     "status": "ongoing",
//     "volunteers": [],
//     "createdAt": "2025-02-03T12:15:54.968Z",
//     "__v": 2
// },

function CampaignCard({
  name,
  description,
  location,
  startDate,
  endDate,
  status,
  volunteers = [],
}) {
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
}

export default CampaignCard;
