"use client";

import cn from "@/utils/cn";
import Image from "next/image";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IFromValues } from "./Stepper";
import { TriangleAlert, Map as MapIcon, Check } from "lucide-react";

type MapType = {
  name: string;
  src: string;
  icon: string;
};

const maps: MapType[] = [
  {
    name: "Cache",
    src: "/maps/cache/de_cache.webp",
    icon: "/maps/cache/de_cache_icon.webp",
  },
  {
    name: "Dust 2",
    src: "/maps/dust2/de_dust2.webp",
    icon: "/maps/dust2/de_dust2_icon.webp",
  },
  {
    name: "Inferno",
    src: "/maps/inferno/de_inferno.webp",
    icon: "/maps/inferno/de_inferno.svg",
  },
  {
    name: "Mirage",
    src: "/maps/mirage/de_mirage.webp",
    icon: "/maps/mirage/de_mirage.svg",
  },
  {
    name: "Nuke",
    src: "/maps/nuke/de_nuke.webp",
    icon: "/maps/nuke/de_nuke.svg",
  },
  {
    name: "Overpass",
    src: "/maps/overpass/de_overpass.webp",
    icon: "/maps/overpass/de_overpass.svg",
  },
  {
    name: "Train",
    src: "/maps/train/de_train.webp",
    icon: "/maps/train/de_train_icon.webp",
  },
  {
    name: "Vertigo",
    src: "/maps/vertigo/de_vertigo.webp",
    icon: "/maps/vertigo/de_vertigo.svg",
  },
];

const Maps = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFromValues>();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Select Map</h1>
        <p className="text-slate-400">
          Choose the competitive map for prediction
        </p>
      </div>

      {errors.selectedMap && (
        <div className="flex justify-center">
          <p className="text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-rose-500/20">
            <TriangleAlert className="w-3.5 h-3.5" />
            {errors.selectedMap.message}
          </p>
        </div>
      )}

      <Controller
        name="selectedMap"
        control={control}
        rules={{ required: "Please select a map" }}
        render={({ field }) => (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl shadow-2xl">
            {maps.map((map) => (
              <label key={map.name} className="cursor-pointer group relative">
                <input
                  type="radio"
                  value={map.name}
                  checked={field.value === map.name}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="sr-only"
                />
                <MapCard
                  name={map.name}
                  src={map.src}
                  icon={map.icon}
                  selected={field.value === map.name}
                />
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
};

const MapCard = ({
  name,
  src,
  icon,
  selected = false,
}: {
  name: string;
  src: string;
  icon: string;
  selected?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative h-40 md:h-56 rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02]",
        selected
          ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0a0f1c] shadow-[0_0_25px_rgba(99,102,241,0.4)]"
          : "hover:ring-1 hover:ring-white/20 border border-transparent hover:border-white/10"
      )}
    >
      {/* Background Image */}
      <Image
        src={src}
        alt={name}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-all duration-500",
          selected
            ? "opacity-60 scale-110"
            : "opacity-40 group-hover:opacity-60 group-hover:scale-105"
        )}
        fill
      />

      {/* Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity",
          selected ? "opacity-100" : "opacity-60 group-hover:opacity-80"
        )}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
        {/* Map Icon */}
        <div
          className={cn(
            "relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-300",
            selected
              ? "scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
              : "group-hover:scale-110 opacity-70 group-hover:opacity-100"
          )}
        >
          <Image
            src={icon}
            alt={`${name} icon`}
            className="object-contain"
            fill
          />
        </div>

        {/* Map Name */}
        <div className="space-y-1 text-center">
          <span
            className={cn(
              "block text-base md:text-lg font-bold tracking-wide uppercase transition-colors duration-200",
              selected
                ? "text-white text-shadow-sm"
                : "text-slate-300 group-hover:text-white"
            )}
          >
            {name}
          </span>
          {selected && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="bg-indigo-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 shadow-md tracking-wider">
                <Check className="w-3 h-3" />
                SELECTED
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Indicator Border */}
      <div
        className={cn(
          "absolute inset-0 border-2 rounded-2xl pointer-events-none transition-colors duration-300",
          selected
            ? "border-indigo-500/20"
            : "border-white/5 group-hover:border-white/10"
        )}
      />
    </div>
  );
};

export default Maps;
