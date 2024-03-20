import * as Slider from "@radix-ui/react-slider";
import { Controller, useFormContext } from "react-hook-form";
import { IFromValues } from "./Stepper";

const MatchData = () => {
  const { register, handleSubmit, setValue, control, watch } =
    useFormContext<IFromValues>();

  return (
    <>
      <h1 className="text-3xl font-bold py-5">3.Choose Match Data</h1>
      <div className="flex justify-center">
        <form className="w-full">
          <Controller
            control={control}
            name="roundTime"
            render={({ field }) => (
              <>
                <p>Round time</p>
                <RoundTime
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
              </>
            )}
          />
        </form>
      </div>
    </>
  );
};

const RoundTime = ({
  onValueChange,
  value,
}: {
  onValueChange: (...event: any[]) => void;
  value: number[];
}) => {
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      defaultValue={[1.55]}
      value={value}
      max={1.55}
      step={0.01}
      onValueChange={(value) => onValueChange({ target: { value } })}
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
