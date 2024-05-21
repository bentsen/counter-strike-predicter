"use client";

import Dropzone, { ExtendedFile, PreviewList } from "@/components/Dropzone";
import cn from "@/utils/cn";
import { ArrowUpIcon, UploadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface IMessage {
  message: string;
  ai: boolean;
}

const CsMapPredictor = () => {
  const [messageArray, setMessageArray] = React.useState<IMessage[]>();

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
  setMessage: React.Dispatch<React.SetStateAction<IMessage[] | undefined>>;
}) => {
  const [files, setFiles] = React.useState<ExtendedFile[]>([]);
  const [image, setImage] = React.useState<ExtendedFile[]>([]);
  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const onSubmit: SubmitHandler<{ message: string }> = (data) => {
    setMessage((prev) => {
      return [
        ...(prev || []),
        {
          message: data.message,
          ai: false,
        },
      ];
    });

    axios
      .post("http://127.0.0.1:8000/map", { description: data.message })
      .then((res) => {
        setMessage((prev) => {
          return [
            ...(prev || []),
            {
              message: res.data,
              ai: true,
            },
          ];
        });
      });

    reset();
  };

  const imageDropzone = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          id: uuidv4(),
          preview: URL.createObjectURL(file),
          isLoading: false,
        })
      );
      const concatted = files.concat(newFiles);
      setImage(concatted);
    },
    noClick: true,
    noKeyboard: true,
    multiple: false,
  });

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-auto min-h-[65px] border border-[#424242] rounded-xl flex-col flex">
        <div className="px-5">
          <PreviewList files={image} setFiles={setImage} />
        </div>
        <div className="flex flex-row items-center">
          <button className="w-14 rounded-r-xl flex items-center justify-center p-2">
            <div
              onClick={imageDropzone.open}
              className="bg.transparent w-full h-10 flex justify-center items-center rounded-lg"
            >
              <UploadIcon className="w-5 h-5" />
            </div>
          </button>
          <input
            {...register("message", { required: true })}
            type="text"
            autoComplete="off"
            className="h-full w-full rounded-xl bg-transparent outline-none indent-2"
            placeholder="Message here"
          />
          <button className="w-14 rounded-r-xl flex items-center justify-center p-2">
            <div className="bg-[#383838] w-full h-10 flex justify-center items-center rounded-lg">
              <ArrowUpIcon />
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

const Chat = ({ messageArray }: { messageArray: IMessage[] | undefined }) => {
  return (
    <div className="w-full h-full flex flex-col gap-10 py-10">
      {messageArray
        ? messageArray.map((message, index) => (
            <Message key={index} ai={message.ai}>
              {message.message}
            </Message>
          ))
        : null}
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
