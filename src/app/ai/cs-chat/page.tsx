"use client";

import { Typewriter } from "react-simple-typewriter";
import cn from "@/utils/cn";
import {
  ArrowUp,
  ChevronLeft,
  Crosshair,
  Loader2,
  Eye,
  List,
  Repeat,
  Upload,
} from "lucide-react";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import Button from "@/components/ui/button";

interface IMessage {
  message?: string;
  image?: string;
  ai: boolean;
  isLoading?: boolean;
}

export interface ExtendedFile extends File {
  id: string;
  preview: string;
  isLoading: boolean;
  description?: string;
}

const CsChat = () => {
  const [messageArray, setMessageArray] = useState<IMessage[]>([]);

  const linkify = (text: string) => {
    const urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const match = text.match(urlRegex);
    return match
      ? { image: match[0], message: text.replace(urlRegex, "") }
      : { image: null, message: text };
  };

  const sendMessage = async (
    message: string,
    image: ExtendedFile | undefined = undefined,
    base64Image: string | null = null
  ) => {
    setMessageArray((prev) => [
      ...prev,
      { message: message, image: image?.preview, ai: false },
      { message: "Loading...", ai: true, isLoading: true },
    ]);

    const response = await axios.post("http://127.0.0.1:8000/predict/chat", {
      image: base64Image,
      description: message,
    });

    const { image: imageResponse, message: messageResponse } = linkify(
      response.data
    );

    setMessageArray((prev) => {
      const newMessageArray = [...prev];
      newMessageArray.pop(); // Remove the loading message
      return [
        ...newMessageArray,
        {
          image: imageResponse ?? undefined,
          message: messageResponse,
          ai: true,
        },
      ];
    });
  };

  return (
    <div className="relative">
      <div className="px-10 fixed top-5">
        <Button href="/ai" variant={"yellow"} className="flex flex-row">
          <ChevronLeft className="w-5 h-6 text-yellow-400" />
          Back
        </Button>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[800px] h-auto min-h-screen flex flex-col justify-between">
          <div className="h-full p-2">
            {messageArray.length > 0 ? (
              <Chat messageArray={messageArray} />
            ) : (
              <div className="w-full h-full flex items-center justify-center pb-20">
                <div className="flex flex-col gap-2 items-center">
                  <Image
                    src={"/logo.png"}
                    className="rounded"
                    width={50}
                    height={50}
                    alt="logo"
                  />
                  <div className="flex flex-row gap-5 mt-10">
                    <div
                      aria-hidden="true"
                      onClick={() => sendMessage("What is CSGO?")}
                      className="w-40 flex flex-col gap-2 rounded-xl h-24 border border-gray-600 hover:bg-gray-600 p-2 cursor-pointer"
                    >
                      <Eye className="text-yellow-300 w-4 h-4" />
                      <span className="text-gray-300 line-clamp-3 text-balance break-words">
                        What is CSGO?
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      onClick={() => sendMessage("Weapon with longest range?")}
                      className="w-40 flex flex-col gap-2 rounded-xl h-24 border border-gray-600 hover:bg-gray-600 p-2 cursor-pointer"
                    >
                      <Crosshair className="text-pink-300 w-4 h-4" />
                      <span className="text-gray-300 line-clamp-3 text-balance break-words">
                        Weapon with longest range?
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      onClick={() => sendMessage("list of skins for awp")}
                      className="w-40 flex flex-col gap-2 rounded-xl h-24 border border-gray-600 hover:bg-gray-600 p-2 cursor-pointer"
                    >
                      <List className="text-blue-300 w-4 h-4" />
                      <span className="text-gray-300 line-clamp-3 text-balance break-words">
                        list of skins for awp
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      onClick={() => sendMessage("what can you answer?")}
                      className="w-40 flex flex-col gap-2 rounded-xl h-24 border border-gray-600 hover:bg-gray-600 p-2 cursor-pointer"
                    >
                      <Repeat className="text-green-300 w-4 h-4" />
                      <span className="text-gray-300 line-clamp-3 text-balance break-words">
                        What can you answer?
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            style={{ transform: "translate(-50%,0%)" }}
            className="w-[800px] text-white p-4 fixed bottom-0 left-1/2 bg-[#060522] z-50"
          >
            <Inputbar setMessage={setMessageArray} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Inputbar = ({
  setMessage,
  sendMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<IMessage[]>>;
  sendMessage: (
    message: string,
    image: ExtendedFile | undefined,
    base64Image: string | null
  ) => void;
}) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<{
    message: string;
    image: ExtendedFile | null;
  }>();

  const watchImage = watch("image");

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const extendedFile: ExtendedFile = Object.assign(file, {
        id: uuidv4(),
        preview: URL.createObjectURL(file),
        isLoading: true,
      });
      setValue("image", extendedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const onSubmit: SubmitHandler<{
    message: string;
    image: ExtendedFile | null;
  }> = async (data) => {
    if (data.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        sendMessage(data.message ?? "", data.image ?? undefined, base64Image);
      };
      reader.readAsDataURL(data.image);
    } else {
      sendMessage(data.message ?? "", undefined, null);
    }
    reset();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-auto min-h-[65px] border border-[#424242] rounded-xl flex-col flex justify-center">
        {watchImage && (
          <div className="px-5">
            <PreviewList file={watchImage} />
          </div>
        )}
        <div className="flex flex-row items-center">
          <div
            className="w-14 rounded-r-xl flex items-center justify-center p-2"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Upload className="w-5 h-5 cursor-pointer" />
          </div>
          <input
            {...register("message")}
            type="text"
            autoComplete="off"
            className="h-full w-full rounded-xl bg-transparent outline-none indent-2"
            placeholder="Message here"
          />
          <button className="w-14 rounded-r-xl flex items-center justify-center p-2">
            <div className="bg-[#383838] w-full h-9 flex justify-center items-center rounded-lg">
              <ArrowUp />
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

const PreviewList = ({ file }: { file: ExtendedFile | null }) => {
  useEffect(() => {
    if (file) {
      file.isLoading = false;
    }
  }, [file]);

  if (!file) {
    return null;
  }

  return (
    <ul
      className={cn(
        "brand-scrollbar mt-2 flex bg-transparent h-20 w-full flex-nowrap gap-2 rounded-md px-2 py-0 transition-all duration-200"
      )}
    >
      <div
        key={file.id}
        className="relative flex h-20 w-20 flex-shrink-0 flex-col overflow-hidden rounded-md"
      >
        <div className="relative m-2 flex flex-grow">
          <Image
            src={file.preview}
            alt={"Uploaded file"}
            fill
            className="absolute object-contain"
            loading={"lazy"}
          />
        </div>
      </div>
    </ul>
  );
};

const Chat = ({ messageArray }: { messageArray: IMessage[] }) => {
  return (
    <div className="w-full h-full flex flex-col gap-10 py-10">
      {messageArray.map((message, index) => (
        <Message
          key={index}
          ai={message.ai}
          message={message.message}
          image={message.image}
          isLoading={message.isLoading}
        />
      ))}
    </div>
  );
};

const Message = ({
  ai,
  message,
  image,
  isLoading,
}: {
  ai: boolean;
  message?: string;
  image?: string;
  isLoading?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-5",
        ai ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn("flex flex-col items-center", ai ? "order-1" : "order-2")}
      >
        {ai && (
          <div
            className={
              "rounded-full w-10 h-10 flex items-center justify-center relative"
            }
          >
            <Image
              src={"/logo.png"}
              fill
              alt="logo"
              className="rounded-full border-[1px]"
            />
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex flex-col",
          ai ? "order-2 text-left" : "order-1 text-right"
        )}
      >
        {image && (
          <div className="w-32 h-32 relative">
            <Image
              src={image}
              alt={"Uploaded file"}
              fill
              className="object-contain"
              loading={"lazy"}
            />
          </div>
        )}
        {message && (
          <div
            className={cn(
              "rounded-full mt-3",
              ai
                ? "bg-transparent"
                : "px-5 py-2 bg-[#1f1d55] max-w-[500px] break-words whitespace-pre-wrap text-white text-left"
            )}
          >
            {isLoading ? (
              <div className="animate-pulse flex flex-row">
                <Loader2 className="w-5 h-5" />
              </div>
            ) : ai ? (
              <Typewriter words={[message]} typeSpeed={10} />
            ) : (
              message
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CsChat;
