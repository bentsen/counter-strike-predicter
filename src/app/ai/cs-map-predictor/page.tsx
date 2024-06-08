"use client";

import cn from "@/utils/cn";
import { ArrowUpIcon, UploadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

interface IMessage {
  message?: string;
  image?: ExtendedFile;
  ai: boolean;
}

export interface ExtendedFile extends File {
  id: string;
  preview: string;
  isLoading: boolean;
  description?: string;
}

const CsMapPredictor = () => {
  const [messageArray, setMessageArray] = useState<IMessage[]>([]);

  return (
    <div className="w-full flex justify-center items-center h-screen py-10 px-28 ">
      <div className="w-full h-full flex items-center justify-center rounded-sm">
        <div className="w-[800px] h-full flex flex-col">
          <div className="w-full h-full overflow-y-scroll pr-10 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-700 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
            <Chat messageArray={messageArray} />
          </div>
          <div className="w-full h-auto flex justify-center items-end py-5 ">
            <Inputbar setMessage={setMessageArray} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Inputbar = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<IMessage[]>>;
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
    // Display the user's message immediately
    setMessage((prev) => [
      ...prev,
      {
        message: data.message || undefined,
        image: data.image || undefined,
        ai: false,
      },
    ]);
    reset();

    const sendRequest = async (image: string | null) => {
      const response = await axios.post("http://127.0.0.1:8000/predict/chat", {
        image: image,
        description: data.message ?? null,
      });

      // Update the state with the AI response
      setMessage((prev) => [...prev, { message: response.data, ai: true }]);
    };

    if (data.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        sendRequest(base64Image);
      };
      reader.readAsDataURL(data.image);
    } else {
      sendRequest(null);
    }
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
            <UploadIcon className="w-5 h-5 cursor-pointer" />
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
              <ArrowUpIcon />
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
        <Message key={index} ai={message.ai}>
          {message.message}
          {message.image && (
            <div className="w-20 h-20 relative">
              <Image
                src={message.image.preview}
                alt={"Uploaded file"}
                fill
                className="absolute object-contain"
                loading={"lazy"}
              />
            </div>
          )}
        </Message>
      ))}
    </div>
  );
};

const Message = ({
  children,
  ai,
}: {
  children: React.ReactNode;
  ai: boolean;
}) => {
  return (
    <div className="flex flex-row gap-5 ">
      <div>
        <div
          className={cn(
            "rounded-full w-10 h-10 flex items-center justify-center",
            ai ? "bg-red-200" : "bg-green-200"
          )}
        >
          {ai ? "Ai" : "You"}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-bold">{ai ? "Chat-Ai" : "You"}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CsMapPredictor;
