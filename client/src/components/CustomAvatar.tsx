import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logout } from "./Logout";
import { Link } from "react-router";

export const CustomAvatar: React.FC = () => {
  const [openAvatar, setOpenAvatar] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenAvatar(false);
      }
    };

    if (openAvatar) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [openAvatar]);

  return (
    <div className="relative select-none" ref={dropdownRef}>
      <Avatar
        onClick={() => setOpenAvatar(!openAvatar)}
        className="border-2 p-1 cursor-pointer"
      >
        <AvatarImage src="/vite.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {openAvatar && (
        <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-2 border flex flex-col w-32 z-10">
          <h1 className="text-center font-bold py-1 border-b">Your Profile</h1>
          <ul className="flex flex-col gap-2 p-2">
            <li
              onClick={() => setOpenAvatar(false)}
              className="border-b border-transparent hover:border-gray-200 transition-all duration-200"
            >
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="border-b border-transparent hover:border-gray-200 transition-all duration-200">
              <Logout />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
