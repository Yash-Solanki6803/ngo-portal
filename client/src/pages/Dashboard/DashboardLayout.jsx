import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router";
import { DeleteNGOBtn } from "../../components";

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

          <ul className="flex flex-col gap-10 mt-10">
            {/* NGO users only */}
            {userInfo.role === "ngo" && (
              <>
                <li>
                  <Link
                    className="font-thin text-xl border-b border-transparent hover:border-gray-900 transition-all duration-200 ease-in"
                    to="/dashboard/campaigns/create"
                  >
                    Start a Campaign
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-thin text-xl border-b border-transparent hover:border-gray-900 transition-all duration-200 ease-in"
                    to={`/dashboard/campaigns`}
                  >
                    Your Campaigns
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-thin text-xl border-b border-transparent hover:border-gray-900 transition-all duration-200 ease-in"
                    to="/dashboard/users"
                  >
                    Volunteers
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-thin text-xl border-b border-transparent hover:border-gray-900 transition-all duration-200 ease-in"
                    to="/dashboard/update-ngo"
                  >
                    Update NGO
                  </Link>
                </li>
                <li>
                  <DeleteNGOBtn />
                </li>
              </>
            )}
            {userInfo.role === "volunteer" && (
              <li>
                <Link
                  className="font-thin text-xl border-b border-transparent hover:border-gray-900 transition-all duration-200 ease-in"
                  to="/dashboard/create-ngo"
                >
                  Create NGO
                </Link>
              </li>
            )}
            {userInfo.role === "dev" && (
              <>
                <li>
                  <Link
                    className="font-thin text-xl border-b border-transparent hover:border-gray-900 transition-all duration-200 ease-in"
                    to="/dashboard/ngos"
                  >
                    All NGOs
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-thin text-xl border-b border-transparent hover:border-gray-900 transition-all duration-200 ease-in"
                    to="/dashboard/users"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
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
