import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";
import { UserRole } from "@/types/user";
import { DeveloperDashboard } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const ngo = useSelector((state: RootState) => state.ngo);
  const userInfo = user.userInfo;
  const ngoInfo = ngo.ngoInfo;
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full px-4 py-2 xl:px-20  xl:py-10 overflow-auto">
      <div className="flex w-full items-center justify-between border-b">
        <h2 className="capitalize text-lg xl:text-4xl font-semibold tracking-wide text-gray-800 py-4 w-full ">
          Welcome {userInfo.name}!
        </h2>
        <Avatar className="p-2 w-10 xl:w-16 h-full ">
          <AvatarImage className="h-full" src="./vite.svg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <article className="py-4 border-b text-xs xl:text-base">
        <p className="w-1/3 ">Email: {userInfo.email}</p>
        <p className="w-1/3 ">Role: {userInfo.role}</p>
      </article>

      {userInfo.role === UserRole.Dev && <DeveloperDashboard />}

      {userInfo.role === UserRole.NGO && ngoInfo !== null && (
        <div>
          <h2>NGO Info</h2>
          <p>NGO Name: {ngoInfo.name}</p>
          <p>NGO description: {ngoInfo.description}</p>
          <p>NGO Email: {ngoInfo.contactEmail}</p>
          <p>NGO Phone: {ngoInfo.contactPhone}</p>
          <p>NGO location: {ngoInfo.location}</p>
          <p>NGO website:{ngoInfo.website}</p>
        </div>
      )}
    </section>
  );
};
