import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";
import { CustomLineChart } from "@/components";
import { UserRole } from "@/types/user";
import { Separator } from "@/components/ui/separator";
import { UserTable } from "../../components/UserTable";

export const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const ngo = useSelector((state: RootState) => state.ngo);
  const userInfo = user.userInfo;
  const ngoInfo = ngo.ngoInfo;
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full px-20  py-10 overflow-auto">
      <h2 className="capitalize text-4xl font-semibold tracking-wide text-gray-800 py-4 w-full border-b">
        Welcome {userInfo.name}!
      </h2>
      <article className="py-4 border-b">
        <p className="w-1/3 ">Email: {userInfo.email}</p>
        <p className="w-1/3 ">Role: {userInfo.role}</p>
      </article>

      {/* Show Count statistics */}
      <article className=" my-4 px-4 border-b  h-[80vh] ">
        <div className="flex justify-between py-10">
          {/* Total Ngos, users and campaigns */}
          <div className="w-1/2 px-10 py-5 flex flex-col justify-evenly">
            <div className="w-full  flex p-4  h-fit ">
              <h4 className="w-1/2 text-4xl  py-2 border-r">Total NGOs</h4>
              <p className="w-1/2 text-center text-5xl py-2">45</p>
            </div>
            <div className="w-full  flex p-4  h-fit ">
              <h4 className="w-1/2 text-4xl  py-2 border-r">Total Campaigns</h4>
              <p className="w-1/2 text-center text-5xl py-2">2235</p>
            </div>
            <div className="w-full  flex p-4  h-fit ">
              <h4 className="w-1/2 text-4xl  py-2 border-r">Total Users</h4>
              <p className="w-1/2 text-center text-5xl py-2">12835</p>
            </div>
          </div>
          <div className="w-1/2 ">
            <CustomLineChart />
          </div>
        </div>
      </article>

      {/* Show latest users and ngos */}

      <article className=" my-4 px-4 py-10 flex gap-10   ">
        <div className="w-1/2 ">
          <h4 className="text-xl font-bold py-3">Latest Users</h4>
          <UserTable />
        </div>
        <div className="w-1/2">
          <h4 className="text-xl font-bold py-3">Latest NGO's</h4>
          <UserTable />
        </div>
      </article>

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
