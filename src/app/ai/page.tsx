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
            src={"/ai_round_predictor_background.png"}
            href={"/ai/cs-round-predictor"}
            title={"Round Predictor"}
          >
            Fill in the details for your desired round situation. Once you have
            completed this, the AI will analyze the round and determine who the
            winner would be.
          </Card>
          <Card
            src={"/ai_chatbot_background.png"}
            href={"/ai/cs-chat"}
            title={"Chat Bot"}
          >
            Have a question about Counter-Strike? This AI is here to help with
            all your queries.
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
      <div className="w-96 h-96 rounded hover:backdrop-saturate-50 group">
        <div className="h-3/5 rounded-t-md relative overflow-hidden">
          <Image
            className="rounded-t-md group-hover:scale-105 transform transition duration-300"
            src={src}
            fill
            alt="background"
          />
          <div className="absolute flex justify-center items-center w-full h-full group-hover:scale-105 transform transition duration-300">
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
