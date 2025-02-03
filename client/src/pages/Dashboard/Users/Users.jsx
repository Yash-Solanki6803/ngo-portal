import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../api/dashboardService";
import { UserCard } from "../../../components";
function Users() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    switch (user.userInfo.role) {
      case "dev":
        try {
          const users = await fetchAllUsers();
          setUsers(users);
          setFilteredUsers(users);
        } catch (error) {
          console.error(error);
        }
        break;
      case "ngo":
        navigate("/dashboard");
        break;
      default:
        alert("You are not authorized to view this page");
        navigate("/");
        break;
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    const filteredUsers = users.filter((user) =>
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <section className="px-20 py-6 w-full  h-full flex flex-col gap-4 overflow-y-auto">
      <div className=" h-1/6 flex flex-col justify-between items-start ">
        <h3 className=" text-2xl font-semibold">All users in website</h3>
        <input
          className="border px-4 w-1/2 py-2 rounded-full focus-within:outline-none shadow-lg"
          type="text"
          onChange={handleSearch}
          placeholder="Search user by their email"
        />
      </div>
      <div className="h-5/6 overflow-y-auto flex flex-col gap-2">
        {loading && <div>Loading...</div>}
        {filteredUsers.map((user) => (
          <UserCard
            key={user._id}
            name={user.name}
            email={user.email}
            role={user.role}
          />
        ))}
      </div>
    </section>
  );
}

export default Users;
