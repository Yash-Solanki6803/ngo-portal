import React from "react";
import { Link } from "react-router";
import { CustomAvatar } from "./CustomAvatar";

export const CustomNavbar: React.FC<{ isLoggedIn: boolean }> = ({
  isLoggedIn,
}) => {
  return (
    <nav className="border-b flex justify-between px-4 xl:px-24 py-6 items-center relative shadow-lg">
      <ul className="flex gap-6 xl:gap-10">
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
          <CustomAvatar />
        ) : (
          <div className="flex gap-10">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
