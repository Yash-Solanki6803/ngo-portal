import { Outlet, Link } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFromToken } from "../api/authservice";
import { getNgoById } from "../api/ngoService";
import { setUserInfo } from "../redux/slices/userSlice";
import { setNgoInfo } from "../redux/slices/ngoSlice";
import { Logout } from "../components";
import { Button } from "@/components/ui/button";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn && token) {
        try {
          const data = await fetchUserFromToken();
          dispatch(setUserInfo(data));
          if (data.ngoId) {
            console.log("fetching ngo data");
            const ngoData = await getNgoById(data.ngoId);
            dispatch(setNgoInfo(ngoData.ngo));
          }
          //set data to redux store
        } catch (error) {
          console.error("Error fetching user from token:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, isLoggedIn, token]);

  return (
    <main className="h-screen flex flex-col">
      <nav className="border flex justify-between px-24 py-6 items-center relative shadow-xl">
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
