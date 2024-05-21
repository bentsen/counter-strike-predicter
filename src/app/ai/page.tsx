import Button from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const Ai = () => {
  return (
    <div className="min-h-screen h-auto w-full pt-10 relative">
      <div className="px-10 fixed top-5">
        <Button href="/" variant={"yellow"} className="flex flex-row">
          <ChevronLeftIcon className="w-5 h-6 text-yellow-400" />
          Back
        </Button>
      </div>
      <div className="flex items-center justify-center p-40">
        <div className="flex flex-row gap-10">
          <Card
            src={"/ai_round_predicter_background.jpg"}
            href={"/ai/cs-round-predictor"}
            title={"Round Predictor"}
          >
            This Ai will take you through a large form where you will be able to
            fill out your desired round situtation. After you are done the ai
            will work your round out and tell you who the round winner would be
          </Card>
          <Card
            src={"/ai_map_predictor_background.jpg"}
            href={"/ai/cs-map-predictor"}
            title={"Map Predictor"}
          >
            This Ai is chat based and will give you a map prediction based on
            your wishes for a map
          </Card>
        </div>
      </div>
    </div>
  );
};

const Card = ({
  title,
  src,
  href,
  children,
}: {
  title: string;
  src: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <div className="w-96 h-96 rounded hover:backdrop-saturate-50">
        <div className="h-3/5 bg-blue-100 rounded-t relative">
          <Image className="rounded-t" src={src} fill alt="background" />
          <div className="absolute flex justify-center items-center w-full h-full">
            <p className="text-xl">{title}</p>
          </div>
        </div>
        <div className="h-2/5 bg-[#07142f] rounded-b p-3">
          <p className="text-sm">{children}</p>
        </div>
      </div>
    </Link>
  );
};

export default Ai;
