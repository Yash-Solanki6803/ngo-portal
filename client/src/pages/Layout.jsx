import { Outlet, Link } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUserFromCookie } from "../redux/slices/userSlice";
import { fetchUserFromCookie } from "../api/authservice";

const Layout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      const data = fetchUserFromCookie();
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <nav className="border flex justify-between px-24 items-center">
        <ul className="flex gap-10 text-3xl">
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

        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
