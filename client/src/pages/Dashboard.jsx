import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
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
    </div>
  );
}

export default Dashboard;
