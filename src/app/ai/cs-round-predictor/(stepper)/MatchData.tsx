import * as Slider from "@radix-ui/react-slider";
import { Controller, useFormContext } from "react-hook-form";
import { IFromValues } from "./Stepper";
import cn from "@/utils/cn";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const MatchData = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useFormContext<IFromValues>();

  return (
    <div className="h-auto">
      <h1 className="text-3xl font-bold py-5">3.Choose Match Data</h1>
      <div className="flex justify-center">
        <form className="w-full flex flex-col gap-2">
          <Controller
            control={control}
            name="matchData.roundTime"
            rules={{ required: "Please select a round time" }}
            render={({ field }) => (
              <div>
                <div className="flex flex-row gap-3 items-center">
                  <p>Round time</p>
                  {errors.matchData?.roundTime && (
                    <>
                      <span>-</span>
                      <p className="text-rose-500 text-xs flex items-center flex-row gap-2">
                        {errors.matchData.roundTime.message}
                        <ExclamationTriangleIcon className="w-4 h-4 inline-block mr-1" />
                      </p>
                    </>
                  )}
                </div>
                <SliderComponent
                  step={0.01}
                  max={177}
                  value={[field.value]}
                  onValueChange={field.onChange}
                />
                <input
                  className="text-black w-full h-10 rounded text-lg p-2"
                  type="number"
                  min={0}
                  max={1.55}
                  onChange={field.onChange}
                  value={field.value}
                />
              </div>
            )}
          />
          <h1 className="text-2xl mt-5">Terrorist</h1>
          <div>
            <div className="flex flex-row gap-3 items-center">
              <p>Score</p>
              {errors.matchData?.tScore && (
                <>
                  <span>-</span>
                  <p className="text-rose-500 text-xs flex items-center flex-row gap-2">
                    {errors.matchData.tScore.message}
                    <ExclamationTriangleIcon className="w-4 h-4 inline-block mr-1" />
                  </p>
                </>
              )}
            </div>
            <input
              {...register("matchData.tScore", {
                required: "Please select a terrorist score",
              })}
              className="text-black w-full h-10 rounded text-lg p-2"
              type="number"
              min={0}
              max={13}
            />
          </div>
          <div>
            <Controller
              name={"matchData.tHealth"}
              control={control}
              rules={{ required: "Please select terrorist team health" }}
              render={({ field }) => (
                <div>
                  <div className="flex flex-row gap-3">
                    <p>Health</p>
                    {errors.matchData?.tHealth && (
                      <>
                        <span>-</span>
                        <p className="text-rose-500 text-xs flex items-center flex-row gap-2">
                          {errors.matchData.tHealth.message}
                          <ExclamationTriangleIcon className="w-4 h-4 inline-block mr-1" />
                        </p>
                      </>
                    )}
                  </div>
                  <SliderComponent
                    max={500}
                    step={1}
                    value={[field.value]}
                    onValueChange={field.onChange}
                  />
                  <input
                    className="text-black w-full h-10 rounded text-lg p-2"
                    type="number"
                    min={0}
                    max={500}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              name={"matchData.tArmor"}
              rules={{ required: "Please select terrorist team armor" }}
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex flex-row gap-3">
                    <p>Armor</p>
                    {errors.matchData?.tArmor && (
                      <>
                        <span>-</span>
                        <p className="text-rose-500 text-xs flex items-center flex-row gap-2">
                          {errors.matchData.tArmor.message}
                          <ExclamationTriangleIcon className="w-4 h-4 inline-block mr-1" />
                        </p>
                      </>
                    )}
                  </div>
                  <SliderComponent
                    max={500}
                    step={1}
                    value={[field.value]}
                    onValueChange={field.onChange}
                  />
                  <input
                    className="text-black w-full h-10 rounded text-lg p-2"
                    type="number"
                    min={0}
                    max={500}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </div>
              )}
            />
          </div>
          <div>
            <p>Bomb Planted</p>
            <div>
              <Controller
                name="matchData.bombPlanted"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-row gap-5">
                    <label>
                      <input
                        type="radio"
                        checked={watch("matchData.bombPlanted")}
                        style={{ display: "none" }}
                        onChange={(e) => field.onChange(true)}
                      />
                      <div
                        className={cn(
                          "w-20 h-10 flex justify-center items-center rounded cursor-pointer",
                          watch("matchData.bombPlanted")
                            ? "bg-blue-900"
                            : "bg-gray-900"
                        )}
                      >
                        yes
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={!watch("matchData.bombPlanted")}
                        onChange={() => field.onChange(false)}
                        style={{ display: "none" }}
                      />
                      <div
                        className={cn(
                          "bg-gray-900 w-20 h-10 flex justify-center items-center rounded cursor-pointer",
                          watch("matchData.bombPlanted")
                            ? "bg-gray-900"
                            : "bg-blue-900"
                        )}
                      >
                        no
                      </div>
                    </label>
                  </div>
                )}
              />
            </div>
          </div>
          <h1 className="text-2xl mt-5">Counter-Terrorist</h1>
          <div>
            <div>
              <div className="flex flex-row gap-3">
                <p>Score</p>
                {errors.matchData?.ctScore && (
                  <>
                    <span>-</span>
                    <p className="text-rose-500 text-xs flex items-center flex-row gap-2">
                      {errors.matchData.ctScore.message}
                      <ExclamationTriangleIcon className="w-4 h-4 inline-block mr-1" />
                    </p>
                  </>
                )}
              </div>
              <input
                {...register("matchData.ctScore", {
                  required: "Please select ct score",
                })}
                className="text-black w-full h-10 rounded text-lg p-2"
                type="number"
                min={0}
                max={13}
              />
            </div>
          </div>
          <div>
            <Controller
              name={"matchData.ctHealth"}
              rules={{ required: "Please select ct health" }}
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex flex-row gap-3">
                    <p>Health</p>
                    {errors.matchData?.ctHealth && (
                      <>
                        <span>-</span>
                        <p className="text-rose-500 text-xs flex items-center flex-row gap-2">
                          {errors.matchData.ctHealth.message}
                          <ExclamationTriangleIcon className="w-4 h-4 inline-block mr-1" />
                        </p>
                      </>
                    )}
                  </div>
                  <SliderComponent
                    max={500}
                    step={1}
                    value={[field.value]}
                    onValueChange={field.onChange}
                  />
                  <input
                    className="text-black w-full h-10 rounded text-lg p-2"
                    type="number"
                    min={0}
                    max={500}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              name={"matchData.ctArmor"}
              control={control}
              rules={{ required: "Please select ct armor" }}
              render={({ field }) => (
                <div>
                  <div className="flex flex-row gap-3">
                    <p>Armor</p>
                    {errors.matchData?.ctArmor && (
                      <>
                        <span>-</span>
                        <p className="text-rose-500 text-xs flex items-center flex-row gap-2">
                          {errors.matchData.ctArmor.message}
                          <ExclamationTriangleIcon className="w-4 h-4 inline-block mr-1" />
                        </p>
                      </>
                    )}
                  </div>
                  <SliderComponent
                    max={500}
                    step={1}
                    value={[field.value]}
                    onValueChange={field.onChange}
                  />
                  <input
                    className="text-black w-full h-10 rounded text-lg p-2"
                    type="number"
                    min={0}
                    max={500}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </div>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const SliderComponent = ({
  onValueChange,
  value,
  step,
  max,
}: {
  onValueChange: (...event: { target: { value: string } }[]) => void;
  value: number[];
  step: number;
  max: number;
}) => {
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      defaultValue={[1.55]}
      value={value}
      max={max}
      step={step}
      onValueChange={(value) =>
        onValueChange({ target: { value: String(value[0]) } })
      }
    >
      <Slider.Track className="bg-black relative grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-white rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        aria-label="time left"
        className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-black rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-black"
      />
    </Slider.Root>
  );
};

export default MatchData;
