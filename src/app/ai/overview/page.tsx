"use client";

import Image from "next/image";
import CountUp from "react-countup";

const Overview = () => {
  return (
    <div className="w-full flex items-center pt-20 flex-col gap-10">
      <h1 className="text-3xl">Overview</h1>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-5 relative w-40 h-40">
          <div className="z-20 flex items-center justify-center h-full flex-col">
            <p className="text-2xl font-bold">CT</p>
            <CountUp className="text-2xl" end={30} suffix="%" duration={5} />
          </div>
          <Image
            src={"/counter-terrorist.png"}
            fill
            alt="terrorist"
            className="absolute z-10 left-1/2 top-1/2"
          />
        </div>
        <span className="items-center flex text-2xl">vs</span>
        <div className="flex flex-col gap-5 relative w-40 h-40">
          <div className="z-20 flex items-center justify-center h-full flex-col">
            <p className="text-xl font-bold">Terrorist</p>
            <CountUp className="text-2xl" end={70} suffix="%" duration={5} />
          </div>
          <Image
            src={"/terrorist.png"}
            fill
            alt="terrorist"
            className="absolute z-10 left-1/2 top-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
