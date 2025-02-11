import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";

export const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const ngo = useSelector((state: RootState) => state.ngo);
  const userInfo = user.userInfo;
  const ngoInfo = ngo.ngoInfo;
  if (!userInfo || !ngoInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Dashboard
      <div>
        <h1>Welcome {userInfo.name}</h1>
        <p>Email: {userInfo.email}</p>
        <p>Role: {userInfo.role}</p>
      </div>
      <div>
        <h2>NGO Info</h2>
        <p>NGO Name: {ngoInfo.name}</p>
        <p>NGO description: {ngoInfo.description}</p>
        <p>NGO Email: {ngoInfo.contactEmail}</p>
        <p>NGO Phone: {ngoInfo.contactPhone}</p>
        <p>NGO location: {ngoInfo.location}</p>
        <p>NGO website:{ngoInfo.website}</p>
      </div>
    </div>
  );
};
