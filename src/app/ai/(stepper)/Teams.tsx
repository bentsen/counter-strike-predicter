"use client";

import cn from "@/utils/cn";
import * as Popover from "@radix-ui/react-popover";
import * as Portal from "@radix-ui/react-portal";
import Image from "next/image";
import React from "react";
import { type IFromValues, type Loadout } from "./Stepper";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";

interface Weapon {
  id: number;
  name: string;
  img: string;
}

interface Armor {
  helmet_armor: boolean;
  armor: boolean;
}

interface Nade {
  id: number;
  name: string;
  img: string;
}

interface Utility {
  nade1: Nade;
  nade2: Nade;
  nade3: Nade;
  nade4: Nade;
}

const weaponList = {
  rifles: [
    {
      id: 1,
      name: "Ak-47",
      img: "/equipment/svg_normal/weapon_ak47.svg",
    },
    {
      id: 2,
      name: "Aug",
      img: "/equipment/svg_normal/weapon_aug.svg",
    },
    {
      id: 3,
      name: "Awp",
      img: "/equipment/svg_normal/weapon_awp.svg",
    },
    {
      id: 4,
      name: "Famas",
      img: "/equipment/svg_normal/weapon_famas.svg",
    },
    {
      id: 5,
      name: "Galil",
      img: "/equipment/svg_normal/weapon_galilar.svg",
    },
    {
      id: 6,
      name: "M4a4",
      img: "/equipment/svg_normal/weapon_m4a1.svg",
    },
    {
      id: 7,
      name: "M4a1",
      img: "/equipment/svg_normal/weapon_m4a1_silencer.svg",
    },
    {
      id: 8,
      name: "Sg 553",
      img: "/equipment/svg_normal/weapon_sg556.svg",
    },
  ],
  smgs: [
    {
      id: 1,
      name: "Bizon",
      img: "/equipment/svg_normal/weapon_bizon.svg",
    },
    {
      id: 2,
      name: "Mac 10",
      img: "/equipment/svg_normal/weapon_mac10.svg",
    },
    {
      id: 3,
      name: "Mp7",
      img: "/equipment/svg_normal/weapon_mp7.svg",
    },
    {
      id: 4,
      name: "Mp9",
      img: "/equipment/svg_normal/weapon_mp9.svg",
    },
    {
      id: 5,
      name: "P90",
      img: "/equipment/svg_normal/weapon_p90.svg",
    },
    {
      id: 6,
      name: "Ump 45",
      img: "/equipment/svg_normal/weapon_ump45.svg",
    },
  ],
  heavy: [
    {
      id: 1,
      name: "Mag 7",
      img: "/equipment/svg_normal/weapon_mag7.svg",
    },
    {
      id: 2,
      name: "Nova",
      img: "/equipment/svg_normal/weapon_nova.svg",
    },
    {
      id: 3,
      name: "Sawed Off",
      img: "/equipment/svg_normal/weapon_sawedoff.svg",
    },
    {
      id: 4,
      name: "Xm1014",
      img: "/equipment/svg_normal/weapon_xm1014.svg",
    },
    {
      id: 5,
      name: "M249",
      img: "/equipment/svg_normal/weapon_m249.svg",
    },
    {
      id: 6,
      name: "Negev",
      img: "/equipment/svg_normal/weapon_negev.svg",
    },
  ],
  pistols: [
    {
      id: 1,
      name: "Cz 75",
      img: "/equipment/svg_normal/weapon_cz75a.svg",
    },
    {
      id: 2,
      name: "Deagle",
      img: "/equipment/svg_normal/weapon_deagle.svg",
    },
    {
      id: 3,
      name: "Dual Berettas",
      img: "/equipment/svg_normal/weapon_elite.svg",
    },
    {
      id: 4,
      name: "Five Seven",
      img: "/equipment/svg_normal/weapon_fiveseven.svg",
    },
    {
      id: 5,
      name: "Glock",
      img: "/equipment/svg_normal/weapon_glock.svg",
    },
    {
      id: 6,
      name: "P2000",
      img: "/equipment/svg_normal/weapon_hkp2000.svg",
    },
    {
      id: 7,
      name: "P250",
      img: "/equipment/svg_normal/weapon_p250.svg",
    },
    {
      id: 8,
      name: "Tec 9",
      img: "/equipment/svg_normal/weapon_tec9.svg",
    },
    {
      id: 9,
      name: "Usp S",
      img: "/equipment/svg_normal/weapon_usp_silencer.svg",
    },
  ],
};

const utilityList = [
  {
    id: 1,
    name: "Decoy",
    img: "/equipment/svg_normal/weapon_decoy.svg",
  },
  {
    id: 2,
    name: "Flashbang",
    img: "/equipment/svg_normal/weapon_flashbang.svg",
  },
  {
    id: 3,
    name: "He Grenade",
    img: "/equipment/svg_normal/weapon_hegrenade.svg",
  },
  {
    id: 4,
    name: "Incendiary",
    img: "/equipment/svg_normal/weapon_molotov.svg",
  },
  {
    id: 5,
    name: "Smoke",
    img: "/equipment/svg_normal/weapon_smokegrenade.svg",
  },
];

const Teams = () => {
  const { control } = useFormContext<IFromValues>();

  const { fields, append, prepend, remove } = useFieldArray({
    name: "ct",
    control: control,
  });

  const {
    fields: fieldsT,
    append: appendT,
    prepend: prependT,
    remove: removeT,
  } = useFieldArray({
    name: "t",
    control: control,
  });

  return (
    <>
      <h1 className="text-3xl font-bold py-5">2.Choose Loadout</h1>
      <div className="flex flex-row gap-1 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          {fieldsT.map((field, index) => (
            <Loadout
              key={field.id}
              loadout={field.loadout}
              number={index}
              terrorist={true}
              remove={removeT}
            />
          ))}
          {fieldsT.length < 5 && (
            <button
              className="border-2 text-3xl border-orange-500/20 text-orange-500/20 rounded h-32"
              onClick={() =>
                appendT({
                  loadout: {
                    mainWeapon: {
                      id: 1,
                      name: "AK-47",
                      img: "/equipment/svg_normal/weapon_ak47.svg",
                    },
                    secondaryWeapon: {
                      id: 1,
                      name: "Glock-18",
                      img: "/equipment/svg_normal/weapon_glock.svg",
                    },
                    utility: {
                      nade1: {
                        id: 5,
                        name: "Smoke",
                        img: "/equipment/svg_normal/weapon_smokegrenade.svg",
                      },
                      nade2: {
                        id: 2,
                        name: "Flashbang",
                        img: "/equipment/svg_normal/weapon_flashbang.svg",
                      },
                      nade3: {
                        id: 4,
                        name: "Molotov",
                        img: "/equipment/svg_normal/weapon_molotov.svg",
                      },
                      nade4: {
                        id: 3,
                        name: "He Grenade",
                        img: "/equipment/svg_normal/weapon_hegrenade.svg",
                      },
                    },
                  },
                })
              }
            >
              +
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          {fields.map((field, index) => (
            <Loadout
              key={field.id}
              loadout={field.loadout}
              number={index}
              terrorist={false}
              remove={remove}
            />
          ))}
          {fields.length < 5 && (
            <button
              className="border-2 text-3xl border-blue-500/20 text-blue-500/20 rounded h-32"
              onClick={() =>
                append({
                  loadout: {
                    mainWeapon: {
                      id: 1,
                      name: "AK-47",
                      img: "/equipment/svg_normal/weapon_ak47.svg",
                    },
                    secondaryWeapon: {
                      id: 1,
                      name: "Glock-18",
                      img: "/equipment/svg_normal/weapon_glock.svg",
                    },
                    utility: {
                      nade1: {
                        id: 5,
                        name: "Smoke",
                        img: "/equipment/svg_normal/weapon_smokegrenade.svg",
                      },
                      nade2: {
                        id: 2,
                        name: "Flashbang",
                        img: "/equipment/svg_normal/weapon_flashbang.svg",
                      },
                      nade3: {
                        id: 4,
                        name: "Molotov",
                        img: "/equipment/svg_normal/weapon_molotov.svg",
                      },
                      nade4: {
                        id: 3,
                        name: "HE",
                        img: "/equipment/svg_normal/weapon_hegrenade.svg",
                      },
                    },
                  },
                })
              }
            >
              +
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const Loadout = ({
  number,
  terrorist,
  loadout,
  remove,
}: {
  number: number;
  terrorist: boolean;
  loadout: Loadout;
  remove: (index: number) => void;
}) => {
  return (
    <div
      className={cn(
        "h-32 w-full rounded-sm",
        terrorist ? "bg-orange-500/20" : "bg-blue-500/20"
      )}
    >
      <div
        className={cn(
          "border-b p-2 h-1/3 flex justify-between",
          terrorist ? "border-orange-900/30" : "border-blue-900/30"
        )}
      >
        <div className="flex items-center ">
          {terrorist ? "Terrorist" : "Counter-Terrorist"} {number + 1} - Loadout
        </div>
        <button
          onClick={() => remove(number)}
          className={cn(
            "flex items-center justify-center w-7 h-7 cursor-pointer rounded",
            terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
          )}
        >
          <Cross1Icon />
        </button>
      </div>
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full w-2/3 relative">
          <MainWeapon playerIndex={number} terrorist={terrorist} />
          <Utility playerIndex={number} terrorist={terrorist} />
        </div>
        <div
          className={
            "w-1/3 h-2/3 flex justify-center items-center cursor-pointer"
          }
        >
          <SecondaryWeapon playerIndex={number} terrorist={terrorist} />
        </div>
      </div>
    </div>
  );
};

const MainWeapon = ({
  terrorist,
  playerIndex,
}: {
  terrorist: boolean;
  playerIndex: number;
}) => {
  const { setValue, watch } = useFormContext<IFromValues>();
  const fieldArrayName = terrorist ? "t" : "ct";
  const mainWeapon = watch(
    `${fieldArrayName}.${playerIndex}.loadout.mainWeapon`
  );
  const handleWeaponSelect = (weapon: Weapon | null) => {
    setValue(`${fieldArrayName}.${playerIndex}.loadout.mainWeapon`, weapon);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          className={cn(
            "border-b border-r h-1/3 w-full relative cursor-pointer ",
            terrorist
              ? "hover:bg-[#50292f] border-orange-900/30"
              : "hover:bg-[#1A2E74] border-blue-900/30"
          )}
        >
          {mainWeapon ? (
            <Image src={mainWeapon.img} alt={mainWeapon.name} fill />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Cross1Icon className="text-black w-7 h-7" />
            </div>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={cn(
            "rounded w-[215px]  flex flex-col h-96 overflow-y-scroll",
            terrorist ? "bg-[#371b1f]" : "bg-[#111e4c]"
          )}
        >
          <div>
            <div
              className={cn("p-1", terrorist ? "bg-[#50292f]" : "bg-blue-950")}
            >
              <span>Rifles</span>
            </div>
            {weaponList.rifles.map((weapon) => (
              <div key={weapon.id}>
                <Popover.Close
                  asChild
                  onClick={() => handleWeaponSelect(weapon)}
                >
                  <div
                    className={cn(
                      "w-full p-2 h-auto text-black first:rounded-t last:rounded-b flex flex-col cursor-pointer",
                      terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
                    )}
                  >
                    <p className="">{weapon.name}</p>
                    <div className="relative h-10">
                      <Image src={weapon.img} alt={weapon.name} fill />
                    </div>
                  </div>
                </Popover.Close>
              </div>
            ))}
          </div>
          <div>
            <div
              className={cn("p-1", terrorist ? "bg-[#50292f]" : "bg-blue-950")}
            >
              <span>Smgs</span>
            </div>
            {weaponList.smgs.map((weapon) => (
              <div key={weapon.id}>
                <Popover.Close
                  asChild
                  onClick={() => handleWeaponSelect(weapon)}
                >
                  <div
                    className={cn(
                      "w-full p-2 h-auto text-black first:rounded-t last:rounded-b flex flex-col cursor-pointer",
                      terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
                    )}
                  >
                    <p className="">{weapon.name}</p>
                    <div className="relative h-10">
                      <Image src={weapon.img} alt={weapon.name} fill />
                    </div>
                  </div>
                </Popover.Close>
              </div>
            ))}
          </div>
          <div>
            <div
              className={cn("p-1", terrorist ? "bg-[#50292f]" : "bg-blue-950")}
            >
              <span>Heavy</span>
            </div>
            {weaponList.heavy.map((weapon) => (
              <div key={weapon.id}>
                <Popover.Close
                  asChild
                  onClick={() => handleWeaponSelect(weapon)}
                >
                  <div
                    className={cn(
                      "w-full p-2 h-auto text-black first:rounded-t last:rounded-b flex flex-col cursor-pointer",
                      terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
                    )}
                  >
                    <p className="">{weapon.name}</p>
                    <div className="relative h-10">
                      <Image src={weapon.img} alt={weapon.name} fill />
                    </div>
                  </div>
                </Popover.Close>
              </div>
            ))}
            <div>
              <div
                className={cn(
                  "p-1",
                  terrorist ? "bg-[#50292f]" : "bg-blue-950"
                )}
              >
                <span>Other</span>
              </div>
              <Popover.Close asChild onClick={() => handleWeaponSelect(null)}>
                <div
                  className={cn(
                    "w-full p-2 h-auto text-black first:rounded-t last:rounded-b flex flex-col cursor-pointer",
                    terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
                  )}
                >
                  <p className="">No Weapon</p>
                  <div className="relative h-10">
                    <div className="flex items-center justify-center h-full">
                      <Cross1Icon className="text-black w-7 h-7" />
                    </div>
                  </div>
                </div>
              </Popover.Close>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const Utility = ({
  terrorist,
  playerIndex,
}: {
  terrorist: boolean;
  playerIndex: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row justify-between border-r w-full h-1/3 cursor-pointer",
        terrorist ? "border-orange-900/30" : "border-blue-900/30"
      )}
    >
      <Nade terrorist={terrorist} playerIndex={playerIndex} nadeIndex="nade1" />
      <Nade terrorist={terrorist} playerIndex={playerIndex} nadeIndex="nade2" />
      <Nade terrorist={terrorist} playerIndex={playerIndex} nadeIndex="nade3" />
      <Nade terrorist={terrorist} playerIndex={playerIndex} nadeIndex="nade4" />
    </div>
  );
};

const Nade = ({
  terrorist,
  nadeIndex,
  playerIndex,
}: {
  terrorist: boolean;
  nadeIndex: "nade1" | "nade2" | "nade3" | "nade4";
  playerIndex: number;
}) => {
  const { setValue, watch, control } = useFormContext<IFromValues>();
  const fieldArrayName = terrorist ? "t" : "ct";
  const nade = watch(
    `${fieldArrayName}.${playerIndex}.loadout.utility.${nadeIndex}`
  );

  const handleSelectNade = (nade: Nade | null) => {
    if (nade) {
      const nades = watch(`${fieldArrayName}.${playerIndex}.loadout.utility`);
      const isFlashbang = nade.name === "Flashbang";
      const maxFlashbangs = 2;
      let flashbangCount = 0;

      for (const key in nades) {
        if (nades[key as keyof Utility]?.name === "Flashbang") {
          flashbangCount++;
        }
        if (!isFlashbang && nades[key as keyof Utility]?.id === nade.id) {
          console.log("You can't have more than one of this type of nade.");
          return;
        }
      }

      if (isFlashbang && flashbangCount >= maxFlashbangs) {
        console.log("You can't have more than two flashbangs.");
      } else {
        setValue(
          `${fieldArrayName}.${playerIndex}.loadout.utility.${nadeIndex}`,
          nade
        );
      }
    } else {
      setValue(
        `${fieldArrayName}.${playerIndex}.loadout.utility.${nadeIndex}`,
        null
      );
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          className={cn(
            "relative w-full",
            terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
          )}
        >
          {nade ? (
            <Image src={nade.img} alt="nade 1" fill />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Cross1Icon className="text-black w-7 h-7" />
            </div>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={cn(
            "rounded flex flex-col h-96 overflow-y-scroll",
            terrorist ? "bg-[#371b1f]" : "bg-[#111e4c]"
          )}
          sideOffset={5}
        >
          <div
            className={cn("p-1", terrorist ? "bg-[#50292f]" : "bg-blue-950")}
          >
            <span>Nades</span>
          </div>
          <>
            {utilityList.map((nade) => (
              <div
                key={nade.id}
                className={cn(
                  "w-full p-2 h-auto text-black first:rounded-t last:rounded-b flex flex-col cursor-pointer",
                  terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
                )}
              >
                <Popover.Close asChild onClick={() => handleSelectNade(nade)}>
                  <div>
                    <p className="">{nade.name}</p>
                    <div className="relative h-10">
                      <Image src={nade.img} alt={nade.name} fill />
                    </div>
                  </div>
                </Popover.Close>
              </div>
            ))}
          </>
          <div
            className={cn(
              "w-full p-2 h-auto text-black first:rounded-t last:rounded-b flex flex-col cursor-pointer",
              terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
            )}
          >
            <Popover.Close asChild onClick={() => handleSelectNade(null)}>
              <div>
                <p className="">{"No nade"}</p>
                <div className="relative h-10">
                  <div className="flex items-center justify-center h-full">
                    <Cross1Icon className="text-black w-7 h-7" />
                  </div>
                </div>
              </div>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const SecondaryWeapon = ({
  terrorist,
  playerIndex,
}: {
  terrorist: boolean;
  playerIndex: number;
}) => {
  const { setValue, watch } = useFormContext<IFromValues>();
  const fieldArrayName = terrorist ? "t" : "ct";
  const secondaryWeapon = watch(
    `${fieldArrayName}.${playerIndex}.loadout.secondaryWeapon`
  );
  const handleWeaponSelect = (weapon: Weapon | null) => {
    setValue(
      `${fieldArrayName}.${playerIndex}.loadout.secondaryWeapon`,
      weapon
    );
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          className={cn(
            "relative h-full w-full",
            terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
          )}
        >
          {secondaryWeapon ? (
            <div className="flex items-center justify-center h-full w-full">
              <Image
                src={secondaryWeapon.img}
                alt="armor"
                width={100}
                height={100}
                className="h-10"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Cross1Icon className="text-black w-7 h-7" />
            </div>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={cn(
            "rounded w-[215px] flex flex-col h-96 overflow-y-scroll",
            terrorist ? "bg-[#371b1f]" : "bg-[#111e4c]"
          )}
        >
          <div>
            <div
              className={cn("p-1", terrorist ? "bg-[#50292f]" : "bg-blue-950")}
            >
              <span>Pistols</span>
            </div>
            {weaponList.pistols.map((weapon) => (
              <div key={weapon.id}>
                <Popover.Close
                  asChild
                  onClick={() => handleWeaponSelect(weapon)}
                >
                  <div
                    className={cn(
                      "w-full p-2 h-auto text-black first:rounded-t last:rounded-b flex flex-col cursor-pointer",
                      terrorist ? "hover:bg-[#50292f]" : " hover:bg-[#1A2E74]"
                    )}
                  >
                    <p className="">{weapon.name}</p>
                    <div className="relative h-10">
                      <Image src={weapon.img} alt={weapon.name} fill />
                    </div>
                  </div>
                </Popover.Close>
              </div>
            ))}
            <div>
              <Popover.Close asChild onClick={() => handleWeaponSelect(null)}>
                <div
                  className={cn(
                    "w-full p-2 h-auto text-black first:rounded-t last:rounded-b flex flex-col cursor-pointer",
                    terrorist ? "hover:bg-[#50292f]" : "hover:bg-[#1A2E74]"
                  )}
                >
                  <p className="">No Weapon</p>
                  <div className="relative h-10">
                    <div className="flex items-center justify-center h-full">
                      <Cross1Icon className="text-black w-7 h-7" />
                    </div>
                  </div>
                </div>
              </Popover.Close>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Teams;
