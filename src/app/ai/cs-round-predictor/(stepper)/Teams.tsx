"use client";

import * as Popover from "@radix-ui/react-popover";

import Image from "next/image";
import React from "react";
import { type IFromValues, type Loadout } from "./Stepper";
import { useFieldArray, useFormContext } from "react-hook-form";
import { X, Plus, Trash2, Sword, Shield, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const { fields, append, remove } = useFieldArray({
    name: "ct",
    control: control,
  });

  const {
    fields: fieldsT,
    append: appendT,
    remove: removeT,
  } = useFieldArray({
    name: "t",
    control: control,
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-white">Team Loadouts</h1>
        <p className="text-xs text-slate-400">Configure weapons and utility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Terrorist Team */}
        <TeamCard
          team="Terrorist"
          color="orange"
          icon={
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          }
        >
          <div className="space-y-2">
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
                className="w-full h-10 border border-dashed border-orange-500/20 rounded-lg flex items-center justify-center gap-2 text-orange-500/40 hover:text-orange-400 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300 group"
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
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Terrorist</span>
              </button>
            )}
          </div>
        </TeamCard>

        {/* Counter-Terrorist Team */}
        <TeamCard
          team="Counter-Terrorist"
          color="blue"
          icon={
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          }
        >
          <div className="space-y-2">
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
                className="w-full h-10 border border-dashed border-blue-500/20 rounded-lg flex items-center justify-center gap-2 text-blue-500/40 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 group"
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
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add CT</span>
              </button>
            )}
          </div>
        </TeamCard>
      </div>
    </div>
  );
};

// Helper Components

const TeamCard = ({
  team,
  color,
  icon,
  children,
}: {
  team: string;
  color: "orange" | "blue";
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "bg-white/5 backdrop-blur-sm border rounded-xl p-3 space-y-3 shadow-xl transition-colors duration-300 flex flex-col h-full",
      color === "orange"
        ? "border-orange-500/10 hover:border-orange-500/20"
        : "border-blue-500/10 hover:border-blue-500/20"
    )}
  >
    <h2 className="text-sm font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/5 uppercase tracking-wide">
      {icon}
      {team}
    </h2>
    <div className="flex-1">{children}</div>
  </div>
);

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
        "relative rounded-lg border transition-all duration-200 overflow-hidden group",
        terrorist
          ? "bg-orange-950/20 border-orange-500/10 hover:border-orange-500/30"
          : "bg-blue-950/20 border-blue-500/10 hover:border-blue-500/30"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "px-3 py-1 flex justify-between items-center bg-black/20 border-b",
          terrorist ? "border-orange-500/10" : "border-blue-500/10"
        )}
      >
        <span className="text-[10px] font-mono font-medium text-slate-400">
          P{number + 1}
        </span>
        <button
          onClick={() => remove(number)}
          className="text-slate-500 hover:text-rose-400 transition-colors p-0.5 hover:bg-white/5 rounded"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Content */}
      <div className="p-2 grid grid-cols-[1fr,auto] gap-2">
        {/* Main Weapon & Utility */}
        <div className="space-y-2">
          <MainWeapon playerIndex={number} terrorist={terrorist} />
          <Utility playerIndex={number} terrorist={terrorist} />
        </div>

        {/* Secondary Weapon */}
        <div className="w-16 pl-2 border-l border-white/5 flex flex-col items-center justify-center">
          <SecondaryWeapon playerIndex={number} terrorist={terrorist} />
          <span className="text-[9px] text-slate-500 mt-1 font-medium uppercase tracking-wider scale-90">
            Sec
          </span>
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
        <button
          className={cn(
            "w-full h-10 rounded shadow-sm border bg-black/20 flex items-center justify-between px-2 relative transition-all duration-200 group/weapon",
            terrorist
              ? "border-orange-500/10 hover:border-orange-500/30 hover:bg-orange-500/5"
              : "border-blue-500/10 hover:border-blue-500/30 hover:bg-blue-500/5"
          )}
        >
          {mainWeapon ? (
            <>
              <div className="flex items-center gap-2 z-10 w-full overflow-hidden">
                <div className="relative w-12 h-8 shrink-0">
                  <Image
                    src={mainWeapon.img}
                    alt={mainWeapon.name}
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>
                <span className="text-xs font-medium text-slate-200 truncate">
                  {mainWeapon.name}
                </span>
              </div>
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover/weapon:opacity-100 transition-opacity rounded bg-gradient-to-r via-transparent to-transparent pointer-events-none",
                  terrorist ? "from-orange-500/5" : "from-blue-500/5"
                )}
              />
            </>
          ) : (
            <div className="flex items-center gap-2 text-slate-500 w-full justify-center">
              <Sword className="w-3.5 h-3.5" />
              <span className="text-[10px]">Primary</span>
            </div>
          )}
        </button>
      </Popover.Trigger>

      <WeaponPopoverContent
        terrorist={terrorist}
        onSelect={handleWeaponSelect}
        weaponList={weaponList}
      />
    </Popover.Root>
  );
};

const WeaponPopoverContent = ({
  terrorist,
  onSelect,
  weaponList,
}: {
  terrorist: boolean;
  onSelect: (weapon: Weapon | null) => void;
  weaponList: any; // Using any for simplicity with the complex object structure
}) => (
  <Popover.Portal>
    <Popover.Content
      className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-1 w-[260px] h-[350px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 data-[side=top]:slide-in-from-bottom-2"
      sideOffset={5}
    >
      <div className="overflow-y-auto flex-1 p-1 space-y-3 pr-2 custom-scrollbar">
        {Object.entries(weaponList).map(
          ([category, weapons]: [string, any]) => (
            <div key={category}>
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
                {category}
              </div>
              <div className="grid grid-cols-1 gap-0.5">
                {weapons.map((weapon: Weapon) => (
                  <Popover.Close
                    key={weapon.id}
                    asChild
                    onClick={() => onSelect(weapon)}
                  >
                    <button className="flex items-center gap-3 p-1.5 rounded hover:bg-white/5 transition-colors group w-full text-left">
                      <div className="relative w-10 h-6 shrink-0">
                        <Image
                          src={weapon.img}
                          alt={weapon.name}
                          fill
                          className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                        {weapon.name}
                      </span>
                    </button>
                  </Popover.Close>
                ))}
              </div>
            </div>
          )
        )}
        <div className="pt-2 border-t border-white/5 mt-2">
          <Popover.Close asChild onClick={() => onSelect(null)}>
            <button className="flex items-center gap-3 p-2 rounded hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left text-slate-400 group">
              <div className="w-10 flex justify-center">
                <X className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium">Remove Weapon</span>
            </button>
          </Popover.Close>
        </div>
      </div>
    </Popover.Content>
  </Popover.Portal>
);

const Utility = ({
  terrorist,
  playerIndex,
}: {
  terrorist: boolean;
  playerIndex: number;
}) => {
  return (
    <div className="flex gap-1.5">
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
  const { setValue, watch } = useFormContext<IFromValues>();
  const fieldArrayName = terrorist ? "t" : "ct";
  const nade = watch(
    `${fieldArrayName}.${playerIndex}.loadout.utility.${nadeIndex}`
  );

  const handleSelectNade = (nade: Nade | null) => {
    if (nade) {
      const nades = watch(`${fieldArrayName}.${playerIndex}.loadout.utility`);
      const isFlashbang = nade.name === "Flashbang";

      // Basic validation logic
      for (const key in nades) {
        // If not flashbang and we already have it
        if (!isFlashbang && nades[key as keyof Utility]?.id === nade.id) {
          return;
        }
      }
      setValue(
        `${fieldArrayName}.${playerIndex}.loadout.utility.${nadeIndex}`,
        nade
      );
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
        <button
          className={cn(
            "h-8 flex-1 rounded border bg-black/20 relative group hover:bg-white/5 transition-all",
            terrorist
              ? "border-orange-500/10 hover:border-orange-500/30"
              : "border-blue-500/10 hover:border-blue-500/30"
          )}
        >
          {nade ? (
            <Image
              src={nade.img}
              alt={nade.name}
              fill
              className="object-contain p-1 drop-shadow-sm"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-700 group-hover:text-slate-500">
              <div className="w-1 h-1 rounded-full bg-current" />
            </div>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-1 w-[160px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
          sideOffset={5}
        >
          <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5 mb-1">
            Grenades
          </div>
          <div className="space-y-0.5">
            {utilityList.map((nade) => (
              <Popover.Close
                key={nade.id}
                asChild
                onClick={() => handleSelectNade(nade)}
              >
                <button className="flex items-center gap-2 p-1.5 rounded hover:bg-white/5 transition-colors w-full text-left group">
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src={nade.img}
                      alt={nade.name}
                      fill
                      className="object-contain opacity-70 group-hover:opacity-100"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                    {nade.name}
                  </span>
                </button>
              </Popover.Close>
            ))}
            <Popover.Close asChild onClick={() => handleSelectNade(null)}>
              <button className="flex items-center gap-2 p-1.5 rounded hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left text-slate-400 group mt-1">
                <div className="w-5 flex justify-center">
                  <X className="w-3 h-3" />
                </div>
                <span className="text-[10px] font-medium">Remove</span>
              </button>
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
        <button
          className={cn(
            "w-full h-10 rounded shadow-sm border bg-black/20 relative group hover:bg-white/5 transition-all",
            terrorist
              ? "border-orange-500/10 hover:border-orange-500/30"
              : "border-blue-500/10 hover:border-blue-500/30"
          )}
        >
          {secondaryWeapon ? (
            <Image
              src={secondaryWeapon.img}
              alt="secondary"
              fill
              className="object-contain p-1 drop-shadow-md"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-700 group-hover:text-slate-500">
              <Crosshair className="w-3.5 h-3.5" />
            </div>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-1 w-[220px] h-[300px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
          sideOffset={5}
        >
          <div className="overflow-y-auto flex-1 p-1 space-y-1 custom-scrollbar">
            <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
              Pistols
            </div>
            {weaponList.pistols.map((weapon) => (
              <Popover.Close
                key={weapon.id}
                asChild
                onClick={() => handleWeaponSelect(weapon)}
              >
                <button className="flex items-center gap-3 p-1.5 rounded hover:bg-white/5 transition-colors group w-full text-left">
                  <div className="relative w-8 h-5 shrink-0">
                    <Image
                      src={weapon.img}
                      alt={weapon.name}
                      fill
                      className="object-contain opacity-70 group-hover:opacity-100"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                    {weapon.name}
                  </span>
                </button>
              </Popover.Close>
            ))}
            <div className="pt-2 border-t border-white/5 mt-2">
              <Popover.Close asChild onClick={() => handleWeaponSelect(null)}>
                <button className="flex items-center gap-3 p-2 rounded hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left text-slate-400 group">
                  <div className="w-8 flex justify-center">
                    <X className="w-3 h-3" />
                  </div>
                  <span className="text-[10px] font-medium">Remove</span>
                </button>
              </Popover.Close>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Teams;
