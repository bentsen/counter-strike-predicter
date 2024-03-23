"use client";

import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Maps from "./Maps";
import Button from "@/components/ui/button";
import Teams from "./Teams";
import MatchData from "./MatchData";
import { useRouter } from "next/navigation";

export interface Loadout {
  mainWeapon: {
    id: number;
    name: string;
    img: string;
  } | null;
  secondaryWeapon: {
    id: number;
    name: string;
    img: string;
  } | null;
  utility: {
    nade1: {
      id: number;
      name: string;
      img: string;
    } | null;
    nade2: {
      id: number;
      name: string;
      img: string;
    } | null;
    nade3: {
      id: number;
      name: string;
      img: string;
    } | null;
    nade4: {
      id: number;
      name: string;
      img: string;
    } | null;
  };
}

export interface IFromValues {
  selectedMap: string;
  ct: {
    loadout: Loadout;
  }[];
  t: {
    loadout: Loadout;
  }[];
  matchData: {
    roundTime: number;
    tScore: number;
    tHealth: number;
    tArmor: number;
    ctScore: number;
    ctHealth: number;
    ctArmor: number;
    bombPlanted: boolean;
  };
}

const Steps = [
  { id: 1, step: 1, component: <Maps /> },
  { id: 2, step: 2, component: <Teams /> },
  { id: 3, step: 3, component: <MatchData /> },
];

const Stepper = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const methods = useForm<IFromValues>({
    defaultValues: {
      t: Array(5).fill({
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
      }),
      ct: Array(5).fill({
        loadout: {
          mainWeapon: {
            id: 1,
            name: "AK-47",
            img: "/equipment/svg_normal/weapon_ak47.svg",
          },
          secondaryWeapon: {
            id: 1,
            name: "Usp-s",
            img: "/equipment/svg_normal/weapon_usp_silencer.svg",
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
      }),
    },
  });

  const goToNextStep = (): void =>
    setCurrentStep(
      currentStep >= Steps.length ? Steps.length : currentStep + 1
    );

  const goToPreviousStep = (): void =>
    setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);
    router.push("/ai/overview");
  });

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-[650px]">
        <form onSubmit={(e) => e.preventDefault()}>
          {Steps.map((step) => currentStep === step.step && step.component)}
          <div className="w-full mt-10 flex flex-row gap-5 justify-center ">
            <Button
              disabled={currentStep <= 1}
              variant={"red"}
              type="button"
              onClick={goToPreviousStep}
            >
              Previous
            </Button>
            {currentStep < Steps.length ? (
              <Button variant={"orange"} type="button" onClick={goToNextStep}>
                Next
              </Button>
            ) : (
              <Button variant={"green"} type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Stepper;
