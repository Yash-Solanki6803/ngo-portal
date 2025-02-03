import { changeUserRole } from "../api/userService";

function UserCard({
  name,
  email,
  role,
  userRole = "ngo",
  showModal,
  setShowModal,
}) {
  return (
    <div className="bg-gray-50 rounded-lg px-10 py-4 shadow-md flex gap-10 justify-between items-center">
      <div className=" w-full flex gap-10 items-center">
        <p className="font-thin border-r border-gray-500 w-1/3"> {name}</p>
        <p className="font-thin border-r border-gray-500 w-1/3"> {email}</p>
        <p className="font-thin w-1/3">{role}</p>
      </div>
      <div className="flex gap-2 ">
        {userRole === "dev" && (
          <button
            className="bg-green-200 rounded-full px-6 py-1 shadow-md border border-green-300 hover:bg-green-300 transition-all duration-300 relative"
            onClick={() =>
              setShowModal(() => {
                if (showModal.email === email) {
                  return { show: false, email: "" };
                }
                return { show: true, email: email };
              })
            }
          >
            Role
            {showModal && showModal.email === email && (
              <RoleModal email={email} />
            )}
          </button>
        )}
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

function RoleModal({ email }) {
  const handleRoleChange = async (newRole) => {
    const response = await changeUserRole(email, newRole);
    if (response.status === 200) {
      alert("User role updated successfully! Please refresh the page");
    } else {
      alert("Something went wrong!");
    }
  };
  return (
    <div className="absolute top-1/2 right-full mr-1 bg-gray-600 text-white py-4  px-4 z-50  rounded-md rounded-tr-none shadow-2xl flex justify-center items-center">
      <div className="flex flex-col gap-1">
        <p
          onClick={() => handleRoleChange("dev")}
          className="border-b border-transparent hover:border-white transition-all duration-300"
        >
          dev
        </p>
        <div className="border border-gray-300"></div>
        <p
          onClick={() => handleRoleChange("ngo")}
          className="border-b border-transparent hover:border-white  duration-300"
        >
          ngo
        </p>
        <div className="border border-gray-300"></div>
        <p
          onClick={() => handleRoleChange("volunteer")}
          className="border-b border-transparent hover:border-white  duration-300"
        >
          Volunteer
        </p>
      </div>
    </div>
  );
}

export default UserCard;
