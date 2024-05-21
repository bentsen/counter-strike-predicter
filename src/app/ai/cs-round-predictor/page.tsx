"use client";

import Button from "@/components/ui/button";
import Stepper, { type IFromValues } from "./(stepper)/Stepper";
import Overview from "./(overview)/Overview";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import React from "react";

const CsRoundPredictor = () => {
  const [prediction, setPrediction] = React.useState<
    { ct: number; t: number } | undefined
  >(undefined);
  const [matchData, setMatchData] = React.useState<IFromValues | undefined>(
    undefined
  );

  return (
    <div className="min-h-screen h-auto w-full pt-10 relative">
      <div className="px-10 fixed top-5">
        <Button href="/ai" variant={"yellow"} className="flex flex-row">
          <ChevronLeftIcon className="w-5 h-6 text-yellow-400" />
          Back
        </Button>
      </div>
      <div className="pt-10">
        {!prediction || !matchData ? (
          <Stepper setPrediction={setPrediction} setMatchData={setMatchData} />
        ) : (
          <Overview prediction={prediction} matchData={matchData} />
        )}
      </div>
    </div>
  );
};

export default CsRoundPredictor;
