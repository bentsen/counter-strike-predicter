import * as Slider from "@radix-ui/react-slider";
import { Controller, useFormContext } from "react-hook-form";
import { IFromValues } from "./Stepper";
import cn from "@/utils/cn";
import {
  TriangleAlert,
  Clock,
  Bomb,
  Trophy,
  Heart,
  Shield,
} from "lucide-react";

const MatchData = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<IFromValues>();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Match Situation</h1>
        <p className="text-slate-400">
          Configure the current round state and team statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Global Match State */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Round Context
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Round Time */}
            <div className="space-y-4">
              <Controller
                control={control}
                name="matchData.roundTime"
                rules={{ required: "Please select a round time" }}
                render={({ field }) => (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-300">
                        Round Time (Minutes)
                      </label>
                      <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                        {Number(field.value).toFixed(2)}
                      </span>
                    </div>

                    <SliderComponent
                      step={0.01}
                      max={1.55} // Standard round time
                      value={[field.value]}
                      onValueChange={field.onChange}
                      trackColor="bg-blue-600"
                    />

                    {errors.matchData?.roundTime && (
                      <p className="text-rose-500 text-xs flex items-center gap-1">
                        <TriangleAlert className="w-3 h-3" />
                        {errors.matchData.roundTime.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Bomb Status */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-300 block">
                Bomb Status
              </label>
              <Controller
                name="matchData.bombPlanted"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => field.onChange(true)}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 group",
                        field.value
                          ? "bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                          : "bg-slate-900/50 border-white/5 text-slate-500 hover:bg-slate-800"
                      )}
                    >
                      <Bomb
                        className={cn(
                          "w-5 h-5 transition-transform group-hover:scale-110",
                          field.value ? "fill-red-500/20" : ""
                        )}
                      />
                      Planted
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange(false)}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 group",
                        !field.value
                          ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                          : "bg-slate-900/50 border-white/5 text-slate-500 hover:bg-slate-800"
                      )}
                    >
                      <Shield
                        className={cn(
                          "w-5 h-5 transition-transform group-hover:scale-110",
                          !field.value ? "fill-green-500/20" : ""
                        )}
                      />
                      Active
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Terrorist View */}
        <TeamCard
          team="Terrorist"
          color="orange"
          icon={
            <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          }
        >
          {/* T Sections */}
          <StatField
            label="Score"
            icon={<Trophy className="w-4 h-4 text-orange-400" />}
            error={errors.matchData?.tScore?.message}
          >
            <input
              {...register("matchData.tScore", {
                required: true,
                min: 0,
                max: 12,
              })}
              type="number"
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono"
              placeholder="0"
              min={0}
              max={12}
            />
          </StatField>

          <Controller
            name="matchData.tHealth"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StatField
                label="Total Health"
                icon={<Heart className="w-4 h-4 text-rose-400" />}
                error={errors.matchData?.tHealth?.message}
                valueDisplay={field.value}
              >
                <SliderComponent
                  max={500}
                  step={1}
                  value={[field.value]}
                  onValueChange={field.onChange}
                  trackColor="bg-orange-500"
                />
              </StatField>
            )}
          />

          <Controller
            name="matchData.tArmor"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StatField
                label="Total Armor"
                icon={<Shield className="w-4 h-4 text-slate-400" />}
                error={errors.matchData?.tArmor?.message}
                valueDisplay={field.value}
              >
                <SliderComponent
                  max={500}
                  step={1}
                  value={[field.value]}
                  onValueChange={field.onChange}
                  trackColor="bg-slate-500"
                />
              </StatField>
            )}
          />
        </TeamCard>

        {/* CT View */}
        <TeamCard
          team="Counter-Terrorist"
          color="blue"
          icon={
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          }
        >
          {/* CT Sections */}
          <StatField
            label="Score"
            icon={<Trophy className="w-4 h-4 text-blue-400" />}
            error={errors.matchData?.ctScore?.message}
          >
            <input
              {...register("matchData.ctScore", {
                required: true,
                min: 0,
                max: 12,
              })}
              type="number"
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
              placeholder="0"
              min={0}
              max={12}
            />
          </StatField>

          <Controller
            name="matchData.ctHealth"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StatField
                label="Total Health"
                icon={<Heart className="w-4 h-4 text-rose-400" />}
                error={errors.matchData?.ctHealth?.message}
                valueDisplay={field.value}
              >
                <SliderComponent
                  max={500}
                  step={1}
                  value={[field.value]}
                  onValueChange={field.onChange}
                  trackColor="bg-blue-500"
                />
              </StatField>
            )}
          />

          <Controller
            name="matchData.ctArmor"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StatField
                label="Total Armor"
                icon={<Shield className="w-4 h-4 text-slate-400" />}
                error={errors.matchData?.ctArmor?.message}
                valueDisplay={field.value}
              >
                <SliderComponent
                  max={500}
                  step={1}
                  value={[field.value]}
                  onValueChange={field.onChange}
                  trackColor="bg-slate-500"
                />
              </StatField>
            )}
          />
        </TeamCard>
      </div>
    </div>
  );
};

// Helper Components for Cleaner Code

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
      "bg-white/5 backdrop-blur-sm border rounded-2xl p-6 space-y-6 shadow-xl transition-colors duration-300",
      color === "orange"
        ? "border-orange-500/10 hover:border-orange-500/20"
        : "border-blue-500/10 hover:border-blue-500/20"
    )}
  >
    <h2 className="text-xl font-semibold text-white flex items-center gap-3 pb-4 border-b border-white/5">
      {icon}
      {team}
    </h2>
    <div className="space-y-6">{children}</div>
  </div>
);

const StatField = ({
  label,
  icon,
  error,
  valueDisplay,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  valueDisplay?: number;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {valueDisplay !== undefined && (
        <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
          {valueDisplay}
        </span>
      )}
    </div>
    {children}
    {error && (
      <p className="text-rose-500 text-xs flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
        <TriangleAlert className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

const SliderComponent = ({
  onValueChange,
  value,
  step,
  max,
  trackColor = "bg-white",
}: {
  onValueChange: (...event: { target: { value: string } }[]) => void;
  value: number[];
  step: number;
  max: number;
  trackColor?: string;
}) => {
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5 group"
      value={value}
      max={max}
      step={step}
      onValueChange={(val) =>
        onValueChange({ target: { value: String(val[0]) } })
      }
    >
      <Slider.Track className="bg-slate-800 relative grow rounded-full h-[4px] overflow-hidden">
        <Slider.Range className={cn("absolute h-full", trackColor)} />
      </Slider.Track>
      <Slider.Thumb
        aria-label="Volume"
        className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-black/50 rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/20 transition-transform duration-200"
      />
    </Slider.Root>
  );
};

export default MatchData;
