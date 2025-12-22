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
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 pb-10 font-sans text-gray-100">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent">
          Round Prediction
        </h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest">
          AI Analysis Overview
        </p>
      </div>

      {/* Prediction Banner */}
      <div className="flex flex-row justify-center items-center gap-12 py-8 relative">
        {/* Terrorist Prediction */}
        <div className="flex flex-col items-center gap-4 relative group">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {prediction.t > prediction.ct && (
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-60 pointer-events-none z-50">
                <Confetti
                  run={isConfetti}
                  gravity={0.03}
                  width={320}
                  height={240}
                  numberOfPieces={200}
                  recycle={false}
                />
              </div>
            )}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-600/20 blur-xl transition-all duration-500 ${
                prediction.t > prediction.ct
                  ? "opacity-100 scale-125"
                  : "opacity-0"
              }`}
            />
            <Image
              src="/terrorist.png"
              width={100}
              height={100}
              alt="Terrorist"
              className="drop-shadow-2xl z-10"
            />
          </div>
          <div className="flex flex-col items-center z-20">
            <h2 className="text-2xl font-bold text-yellow-500">Terrorist</h2>
            <div className="text-5xl font-black tabular-nums tracking-tighter text-white drop-shadow-glow">
              <CountUp
                onEnd={() => setIsConfetti(true)}
                end={prediction.t}
                suffix="%"
                duration={3}
              />
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-black italic text-gray-700 select-none opacity-50">
            VS
          </span>
        </div>

        {/* CT Prediction */}
        <div className="flex flex-col items-center gap-4 relative group">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {prediction.ct > prediction.t && (
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-60 pointer-events-none z-50">
                <Confetti
                  run={isConfetti}
                  gravity={0.03}
                  width={320}
                  height={240}
                  numberOfPieces={200}
                  recycle={false}
                />
              </div>
            )}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20 blur-xl transition-all duration-500 ${
                prediction.ct > prediction.t
                  ? "opacity-100 scale-125"
                  : "opacity-0"
              }`}
            />
            <Image
              src="/counter-terrorist.png"
              width={100}
              height={100}
              alt="Counter-Terrorist"
              className="drop-shadow-2xl z-10 scale-x-[-1]"
            />
          </div>
          <div className="flex flex-col items-center z-20">
            <h2 className="text-2xl font-bold text-blue-500">
              Counter-Terrorist
            </h2>
            <div className="text-5xl font-black tabular-nums tracking-tighter text-white drop-shadow-glow">
              <CountUp end={prediction.ct} suffix="%" duration={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        {/* T Side Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-r from-yellow-900/40 to-transparent p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-yellow-100/90 mb-1">
              Terrorist Stats
            </h3>
            <div className="flex justify-between text-sm text-yellow-200/60 font-medium font-mono">
              <span>Health: {matchData.matchData.tHealth}</span>
              <span>Armor: {matchData.matchData.tArmor}</span>
            </div>
          </div>

          <div className="space-y-3">
            {matchData.t.map((terrorist, index) => (
              <PlayerCard
                key={index}
                index={index + 1}
                player={terrorist}
                side="t"
              />
            ))}
          </div>
        </div>

        {/* Center Map & Info */}
        <div className="flex flex-col gap-6 ">
          <div className="relative group rounded-xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-900">
            <Image
              src={`/maps/${matchData.selectedMap
                .toLowerCase()
                .trim()}/de_${matchData.selectedMap.toLowerCase().trim()}.webp`}
              alt={matchData.selectedMap}
              width={600}
              height={400}
              className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                Current Map
              </p>
              <h3 className="text-3xl font-black capitalize">
                {matchData.selectedMap}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex flex-col items-center justify-center gap-1">
              <span className="text-gray-400 text-xs uppercase tracking-widest">
                Round Time
              </span>
              <span className="text-2xl font-mono text-white font-bold">
                {matchData.matchData.roundTime}s
              </span>
            </div>
            <div
              className={`border rounded-lg p-4 flex flex-col items-center justify-center gap-1 ${
                matchData.matchData.bombPlanted
                  ? "bg-red-900/20 border-red-500/50"
                  : "bg-gray-900/50 border-gray-800"
              }`}
            >
              <span
                className={`${
                  matchData.matchData.bombPlanted
                    ? "text-red-400"
                    : "text-gray-400"
                } text-xs uppercase tracking-widest`}
              >
                Bomb Status
              </span>
              <span
                className={`text-2xl font-bold ${
                  matchData.matchData.bombPlanted
                    ? "text-red-500 animate-pulse"
                    : "text-green-500"
                }`}
              >
                {matchData.matchData.bombPlanted ? "PLANTED" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* CT Side Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-l from-blue-900/40 to-transparent p-4 rounded-lg border-r-4 border-blue-500 text-right">
            <h3 className="text-xl font-bold text-blue-100/90 mb-1">
              CT Stats
            </h3>
            <div className="flex justify-end gap-4 text-sm text-blue-200/60 font-medium font-mono">
              <span>Health: {matchData.matchData.ctHealth}</span>
              <span>Armor: {matchData.matchData.ctArmor}</span>
            </div>
          </div>

          <div className="space-y-3">
            {matchData.ct.map((ct, index) => (
              <PlayerCard key={index} index={index + 1} player={ct} side="ct" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerCard = ({
  index,
  player,
  side,
}: {
  index: number;
  player: any;
  side: "t" | "ct";
}) => {
  const isT = side === "t";
  const borderColor = isT
    ? "border-yellow-500/20 hover:border-yellow-500/50"
    : "border-blue-500/20 hover:border-blue-500/50";
  const bgGradient = isT
    ? "bg-gradient-to-r from-yellow-900/10 to-transparent"
    : "bg-gradient-to-l from-blue-900/10 to-transparent";

  return (
    <div
      className={`relative flex items-center justify-between p-3 rounded-lg border bg-gray-900/80 transition-all ${borderColor} ${bgGradient}`}
    >
      <div
        className={`flex items-center gap-4 ${
          !isT && "flex-row-reverse order-1"
        }`}
      >
        <div
          className={`flex items-center justify-center w-8 h-8 rounded bg-gray-800 text-xs font-bold text-gray-500`}
        >
          {index}
        </div>

        {/* Weapon Icon */}
        <div className="w-16 h-10 relative flex-shrink-0">
          <Image
            src={player.loadout.mainWeapon?.img ?? ""}
            alt="weapon"
            fill
            className={`object-contain ${!isT && "scale-x-[-1]"}`}
          />
        </div>
      </div>

      {/* Utility */}
      <div className={`flex items-center gap-1 ${!isT && "flex-row-reverse"}`}>
        {[
          player.loadout.utility.nade1,
          player.loadout.utility.nade2,
          player.loadout.utility.nade3,
          player.loadout.utility.nade4,
        ].map((nade, i) =>
          nade ? (
            <div
              key={i}
              className="w-6 h-6 relative opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image
                src={nade.img ?? ""}
                alt="nade"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-gray-800/30 border border-gray-700/30"
            />
          )
        )}
      </div>
    </div>
  );
};

export default Overview;
