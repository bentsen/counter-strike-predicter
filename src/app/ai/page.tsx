import Button from "@/components/ui/button";
import Stepper from "./Stepper";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const PredictPage = () => {
  return (
    <div className="min-h-screen h-auto w-full pt-10 relative">
      <div className="px-10 fixed top-5">
        <Button href="/" variant={"yellow"} className="flex flex-row">
          <ChevronLeftIcon className="w-5 h-6 text-yellow-400" />
          Back
        </Button>
      </div>
      <div className="pt-10">
        <Stepper />
      </div>
    </div>
  );
};

export default PredictPage;
