import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { fetchAllUsers } from "@/api/authservice";
import { UserCard } from "@/components";
import { RootState } from "@/redux/store";
import { User } from "@/types/user";
export const Users: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState({
    show: false,
    email: "",
  });
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!user.isLoggedIn || !user.userInfo) {
      navigate("/login");
      return;
    }
    switch (user.userInfo.role) {
      case "dev":
        try {
          const response = await fetchAllUsers();
          const users = response.data.users;
          if (!users) {
            throw new Error("No users found");
          }
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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
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
        {filteredUsers.map((filteredUser) => (
          <UserCard
            key={filteredUser._id}
            name={filteredUser.name}
            email={filteredUser.email}
            role={filteredUser.role}
            userRole={user.userInfo?.role}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        ))}
      </div>
    </section>
  );
};
