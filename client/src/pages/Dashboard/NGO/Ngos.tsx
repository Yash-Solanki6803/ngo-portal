import { NGO } from "@/types/ngo";
import React, { ChangeEvent, useEffect, useState } from "react";

import { getAllNgos } from "@/api/ngoService";
import { CustomLineChart } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Ngos: React.FC = () => {
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [filteredNgos, setFilteredNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNgos = async () => {
      const response = await getAllNgos();
      const { data } = response;
      if (!data.ngos) return;
      setNgos(data.ngos);
      setFilteredNgos(data.ngos);
      setLoading(false);
    };
    fetchNgos();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const filteredNgos = ngos.filter((ngo) =>
      ngo.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNgos(filteredNgos);
  };

  return (
    <section className="w-full  overflow-y-auto px-10 py-6 flex flex-col gap-6">
      {/* NGO statistics */}
      <article className=" xl:my-4 xl:px-4 border-b  ">
        <div className="flex flex-col xl:flex-row justify-between xl:py-10 ">
          {/* Total Ngos, users and campaigns */}
          <div className="w-full xl:px-20 py-5 flex flex-col lg:flex-row justify-between">
            <div className=" lg:px-10 flex flex-row lg:flex-col  xl:p-4 justify-between h-fit ">
              <h4 className=" xl:text-4xl  py-2 xl:border-b">Total NGOs</h4>
              <p className="  xl:text-5xl py-2">45</p>
            </div>
            <div className=" lg:px-10  flex flex-row lg:flex-col  xl:p-4 justify-between h-fit ">
              <h4 className=" xl:text-4xl   py-2 xl:border-b">
                Total Campaigns
              </h4>
              <p className="  xl:text-5xl py-2">2235</p>
            </div>
            <div className=" lg:px-10  flex flex-row lg:flex-col  xl:p-4 justify-between h-fit ">
              <h4 className=" xl:text-4xl   py-2 xl:border-b">Total Users</h4>
              <p className="  xl:text-5xl py-2">12835</p>
            </div>
          </div>
          <div className="">
            <CustomLineChart />
          </div>
        </div>
      </article>
      <input
        className="border px-4 w-full xl:w-1/2 text-xs md:text-sm xl:text-base py-2 rounded-full focus-within:outline-none shadow-lg"
        type="text"
        onChange={handleSearch}
        placeholder="Search NGO by their name"
      />
      {/* NGO card */}
      <article className="flex flex-wrap gap-4 justify-center xl:justify-start">
        {filteredNgos.map((ngo) => (
          <Card
            key={ngo._id}
            className="flex-grow basis-[300px] max-w-[400px] md:basis-[350px] lg:basis-[300px] xl:basis-[280px]"
          >
            <CardHeader>
              <CardTitle className="tracking-wider text-lg">
                {ngo.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                className="border rounded-md shadow-lg w-full h-[200px] object-cover"
                src="/ngo_default.webp" //TODO: replace with ngo image
                alt="NGO default image"
              />
              <CardDescription className="py-2">
                {ngo.description?.length > 100
                  ? ngo.description?.slice(0, 100) + "..."
                  : ngo.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="w-full flex justify-between border-t items-center pt-3 text-xs md:text-sm">
              <p>{ngo.website || "No associated website"}</p>
              <p>{ngo.contactEmail || "No email"}</p>
            </CardFooter>
          </Card>
        ))}
      </article>
    </section>
  );
};
