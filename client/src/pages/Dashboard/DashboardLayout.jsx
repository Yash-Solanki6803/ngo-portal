import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router";

function DashboardLayout() {
  const user = useSelector((state) => state.user);
  const userInfo = user.userInfo;

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex h-full overflow-y-hidden">
      <nav className="border-r flex flex-col p-6 justify-between">
        <div>
          <Link
            to="/dashboard"
            className="font-semibold text-3xl border-b pb-6"
          >
            Dashboard
          </Link>

          <ul className="flex gap-10 mt-10">
            <li>
              <Link
                className="font-thin text-xl border-b border-transparent hover:border-gray-900 transition-all duration-200 ease-in"
                to="/dashboard/users"
              >
                Users
              </Link>
            </li>
          </ul>
        </div>

        <div className="font-thin text-sm left-0 py-6 border-t ">
          <h1>Welcome {userInfo.name}</h1>
          <p>Email: {userInfo.email}</p>
          <p>Role: {userInfo.role}</p>
        </div>
      </nav>
      <Outlet />
    </section>
  );
}

export default DashboardLayout;
