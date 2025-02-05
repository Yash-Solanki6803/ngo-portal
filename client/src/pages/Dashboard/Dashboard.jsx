import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const ngoInfo = useSelector((state) => state.ngo);
  const userInfo = user.userInfo;

  if (!userInfo) {
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
}

export default Dashboard;
