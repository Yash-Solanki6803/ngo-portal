import React from "react";
import { CustomLineChart } from "./LineChart";
import { UserTable } from "./UserTable";

export const DeveloperDashboard: React.FC = () => {
  return (
    <>
      {/* Show Count statistics */}
      <article className=" xl:my-4 xl:px-4 border-b  h-[65vh] xl:h-[80vh] ">
        <div className="flex flex-col xl:flex-row justify-between xl:py-10">
          {/* Total Ngos, users and campaigns */}
          <div className="xl:w-1/2  xl:px-20 py-5 flex flex-col justify-evenly">
            <div className="w-full flex xl:p-4 justify-between h-fit ">
              <h4 className="xl:w-1/2 xl:text-4xl text-left   py-2 xl:border-r">
                Total NGOs
              </h4>
              <p className="xl:w-1/2 text-right xl:text-5xl py-2">45</p>
            </div>
            <div className="w-full  flex xl:p-4 justify-between h-fit ">
              <h4 className="xl:w-1/2 xl:text-4xl text-left    py-2 xl:border-r">
                Total Campaigns
              </h4>
              <p className="xl:w-1/2 text-right xl:text-5xl py-2">2235</p>
            </div>
            <div className="w-full  flex xl:p-4 justify-between h-fit ">
              <h4 className="xl:w-1/2 xl:text-4xl text-left    py-2 xl:border-r">
                Total Users
              </h4>
              <p className="xl:w-1/2 text-right xl:text-5xl py-2">12835</p>
            </div>
          </div>
          <div className="xl:w-1/2 ">
            <CustomLineChart />
          </div>
        </div>
      </article>

      {/* Show latest users and ngos */}

      <article className="my-4 xl:px-4 py-10 flex flex-col xl:flex-row gap-10   ">
        <div className="xl:w-1/2 ">
          <h4 className="xl:text-xl font-bold py-3">Latest Users</h4>
          <UserTable />
        </div>
        <div className="xl:w-1/2">
          <h4 className="xl:text-xl font-bold py-3">Latest NGO's</h4>
          <UserTable />
        </div>
      </article>
    </>
  );
};
