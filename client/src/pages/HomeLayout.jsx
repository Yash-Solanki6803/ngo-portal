import { Outlet, Link } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFromToken } from "../api/authservice";
import { setUserInfo } from "../redux/slices/userSlice";
import { Logout } from "../components";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn && token) {
        try {
          const data = await fetchUserFromToken();
          //set data to redux store
          dispatch(setUserInfo(data));
        } catch (error) {
          console.error("Error fetching user from token:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, isLoggedIn, token]);

  return (
    <main className="h-screen flex flex-col">
      <nav className="border flex justify-between px-24 py-6 items-center">
        <ul className="flex gap-10">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div>
          {isLoggedIn ? (
            <div className="flex gap-10">
              <Logout />
              <Link to="/dashboard">Dashboard</Link>
            </div>
          ) : (
            <div className="flex gap-10">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </nav>

      <Outlet />
    </main>
  );
};

export default HomeLayout;
