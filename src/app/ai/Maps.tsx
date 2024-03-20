"use client";

import Button from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { IFromValues } from "./Stepper";

type MapType = {
  name: string;
  src: string;
  icon: string;
};

const maps: MapType[] = [
  {
    name: "Ancient",
    src: "/maps/ancient/de_ancient.webp",
    icon: "/maps/ancient/de_ancient.svg",
  },
  {
    name: "Inferno",
    src: "/maps/inferno/de_inferno.png",
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
    name: "Vertigo",
    src: "/maps/vertigo/de_vertigo.webp",
    icon: "/maps/vertigo/de_vertigo.svg",
  },
  {
    name: "Anubis",
    src: "/maps/anubis/de_anubis.webp",
    icon: "/maps/anubis/de_anubis.svg",
  },
];

const Maps = () => {
  const { register, handleSubmit, setValue, control } =
    useFormContext<IFromValues>();

  return (
    <>
      <h1 className="text-3xl font-bold py-5">1.Choose Map</h1>
      <Controller
        name="selectedMap"
        control={control}
        render={({ field }) => (
          <div className="relative aspect-square h-fit overflow-hidden w-full">
            <div className="grid size-full grid-cols-3 grid-rows-3 gap-2 max-md:gap-1">
              {maps.map((map, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    value={map.name}
                    checked={field.value === map.name}
                    onChange={(e) => field.onChange(e.target.value)}
                    style={{ display: "none" }}
                  />
                  <Map
                    key={map.name}
                    name={map.name}
                    src={map.src}
                    icon={map.icon}
                    selected={field.value === map.name}
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      />
    </>
  );
};

const Map = ({
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
      className={
        "size-full rounded text-neutral-0 outline-none border-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#0a0522] relative flex flex-col items-center justify-center overflow-hidden p-2 " +
        (selected
          ? "border-indigo-500"
          : "hover:border-gray-300 border-transparent")
      }
    >
      <Image
        src={src}
        alt={name}
        className="pointer-events-none absolute left-0 top-0 z-0 size-full object-cover opacity-20"
        fill
      />
      <Image
        src={icon}
        alt={name}
        className="pointer-events-none h-8 object-contain max-md:h-6"
        width={100}
        height={100}
      />
      <span className="pointer-events-none z-[1] mt-2 flex w-fit items-center justify-center text-center text-neutral-0 font-style-label-3">
        {name}
      </span>
    </div>
  );
};

export default Maps;
