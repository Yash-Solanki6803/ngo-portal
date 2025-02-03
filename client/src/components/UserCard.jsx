function UserCard({ name, email, role }) {
  return (
    <div className="bg-gray-50 rounded-lg px-10 py-4 shadow-md flex gap-10 justify-between items-center">
      <div className=" w-full flex gap-10 items-center">
        <p className="font-thin border-r border-gray-500 w-1/3"> {name}</p>
        <p className="font-thin border-r border-gray-500 w-1/3"> {email}</p>
        <p className="font-thin w-1/3">{role}</p>
      </div>
      <div className="flex gap-2 ">
        <button className="bg-yellow-200 rounded-full px-6 py-1 shadow-md border border-yellow-300 hover:bg-yellow-300 transition-all duration-300">
          Edit
        </button>
        <button className="bg-red-500 rounded-full px-6 py-1 text-white shadow-md border border-red-300 hover:bg-red-600 transition-all duration-300">
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserCard;
