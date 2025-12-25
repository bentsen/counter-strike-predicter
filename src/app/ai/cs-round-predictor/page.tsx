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
    <div className="min-h-screen h-auto w-full pt-10 relative">
      <div className="px-10 fixed top-5">
        <Button asChild variant={"yellow"} className="flex flex-row">
          <Link href="/ai">
            <ChevronLeft className="w-5 h-6 text-yellow-400" />
            Back
          </Link>
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
