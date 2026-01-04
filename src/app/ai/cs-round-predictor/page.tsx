"use client";

import { Button } from "@/components/ui/button";
import Stepper, { type IFromValues } from "./(stepper)/Stepper";
import Overview from "./(overview)/Overview";
import { ChevronLeft } from "lucide-react";
import React from "react";
import Link from "next/link";

const CsRoundPredictor = () => {
  const [prediction, setPrediction] = React.useState<
    { ct: number; t: number } | undefined
  >(undefined);
  const [matchData, setMatchData] = React.useState<IFromValues | undefined>(
    undefined
  );

  return (
    <div className="min-h-screen h-auto w-full pt-24 relative">
      <div className="pt-0">
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
