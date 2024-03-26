"use client";

import Image from "next/image";
import CountUp from "react-countup";
import Confetti from "react-confetti";
import React from "react";
import { IFromValues } from "../(stepper)/Stepper";

const Overview = ({
  prediction,
  matchData,
}: {
  prediction: { ct: number; t: number };
  matchData: IFromValues;
}) => {
  const [isConfetti, setIsConfetti] = React.useState(false);

  return (
    <div className="w-full flex items-center flex-col gap-10">
      <h1 className="text-3xl">Overview</h1>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-5 relative w-40 h-40">
          <div className="z-20 flex items-center justify-center h-full flex-col">
            {prediction.t > prediction.ct && (
              <Confetti
                run={isConfetti}
                gravity={0.01}
                className="w-full rounded-t-full"
                width={300}
                height={250}
              />
            )}
            <p className="text-xl font-bold">Terrorist</p>
            <CountUp
              onEnd={() => setIsConfetti(true)}
              className="text-2xl"
              end={prediction.t}
              suffix="%"
              duration={5}
            />
          </div>
          <Image
            src={"/terrorist.png"}
            fill
            alt="terrorist"
            className="absolute z-10 left-1/2 top-1/2"
          />
        </div>
        <span className="items-center flex text-2xl">vs</span>
        <div className="flex flex-col gap-5 relative w-40 h-40">
          <div className="z-20 flex items-center justify-center h-full flex-col">
            <p className="text-2xl font-bold">CT</p>
            {prediction.ct > prediction.t && (
              <Confetti
                run={isConfetti}
                gravity={0.01}
                className="w-full rounded-t-full"
                width={300}
                height={250}
              />
            )}
            <CountUp
              className="text-2xl"
              end={prediction.ct}
              suffix="%"
              duration={5}
            />
          </div>
          <Image
            src={"/counter-terrorist.png"}
            fill
            alt="terrorist"
            className="absolute z-10 left-1/2 top-1/2"
          />
        </div>
      </div>
      <div className="border rounded border-gray-700 w-[1000px] h-auto p-5">
        <div className="flex justify-center w-full">
          <h1 className="underline text-xl font-medium">Round data</h1>
        </div>
        <div className="flex justify-between px-5 mt-5">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">Terrorist</h2>
            <div className="px-5 flex flex-col">
              <span>Total Health: {matchData.matchData.tHealth}</span>
              <span>Total Armor: {matchData.matchData.tArmor}</span>
            </div>
            <div className="flex flex-col px-10">
              {matchData.t.map((terrorist, index) => (
                <>
                  <span>Player {index + 1}</span>
                  <div className="flex flex-col px-5">
                    <div className="flex flex-row items-center">
                      Weapon:{" "}
                      <Image
                        src={terrorist.loadout.mainWeapon?.img ?? ""}
                        alt="weapon"
                        width={50}
                        height={50}
                      />
                    </div>

                    <div className="flex flex-row items-center">
                      Nades:{" "}
                      {terrorist.loadout.utility.nade1 && (
                        <Image
                          src={terrorist.loadout.utility.nade1?.img ?? ""}
                          alt="weapon"
                          width={10}
                          height={10}
                        />
                      )}
                      {terrorist.loadout.utility.nade2 && (
                        <Image
                          src={terrorist.loadout.utility.nade2?.img ?? ""}
                          alt="weapon"
                          width={10}
                          height={10}
                        />
                      )}
                      {terrorist.loadout.utility.nade3 && (
                        <Image
                          src={terrorist.loadout.utility.nade3?.img ?? ""}
                          alt="weapon"
                          width={10}
                          height={10}
                        />
                      )}
                      {terrorist.loadout.utility.nade4 && (
                        <Image
                          src={terrorist.loadout.utility.nade4?.img ?? ""}
                          alt="weapon"
                          width={10}
                          height={10}
                        />
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div>
            <Image
              src={`/maps/${matchData.selectedMap
                .toLowerCase()
                .trim()}/de_${matchData.selectedMap.toLowerCase().trim()}.webp`}
              alt="map"
              width={300}
              height={300}
              className="rounded"
            />
            <div className="flex flex-col items-center mt-1">
              <span>Map: {matchData.selectedMap}</span>
              <span>
                Time Left: {String(matchData.matchData.roundTime)} Seconds
              </span>
              <span>
                Bomb Planted: {matchData.matchData.bombPlanted ? "yes" : "no"}
              </span>
            </div>
          </div>
          <div className="flex flex-col text-end">
            <h2 className="text-lg font-medium">Counter-Terrorist</h2>
            <div className="px-5 flex flex-col text-end">
              <span>{matchData.matchData.ctHealth} :Total Health</span>
              <span>{matchData.matchData.ctArmor} :Total Armor</span>
            </div>
            <div className="flex flex-col px-10 text-end">
              {matchData.ct.map((ct, index) => (
                <>
                  <span>Player {index + 1}</span>
                  <div className="flex flex-col px-5">
                    <div className="flex flex-row items-center">
                      <Image
                        src={ct.loadout.mainWeapon?.img ?? ""}
                        alt="weapon"
                        width={50}
                        height={50}
                        className="scale-x-[-1]"
                      />{" "}
                      :Weapon
                    </div>
                    <div className="flex flex-row items-center justify-end">
                      {ct.loadout.utility.nade1 && (
                        <Image
                          src={ct.loadout.utility.nade1?.img ?? ""}
                          alt="weapon"
                          width={10}
                          height={10}
                        />
                      )}
                      {ct.loadout.utility.nade2 && (
                        <Image
                          src={ct.loadout.utility.nade2?.img ?? ""}
                          alt="weapon"
                          width={10}
                          height={10}
                        />
                      )}
                      {ct.loadout.utility.nade3 && (
                        <Image
                          src={ct.loadout.utility.nade3?.img ?? ""}
                          alt="weapon"
                          width={10}
                          height={10}
                        />
                      )}
                      {ct.loadout.utility.nade4 && (
                        <Image
                          src={ct.loadout.utility.nade4?.img ?? ""}
                          alt="weapon"
                          width={10}
                          height={10}
                        />
                      )}
                      :Nades
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
