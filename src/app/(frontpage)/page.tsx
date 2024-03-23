"use client";

import Banner from "./Banner";
import Button from "../../components/ui/button";
import {
  ChevronDownIcon,
  CubeIcon,
  ViewVerticalIcon,
  EnterIcon,
  InfoCircledIcon,
  PersonIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const aboutRef = React.useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div
        className="relative z-10 h-screen w-screen"
        style={{
          background:
            "linear-gradient(0deg, rgb(6, 5, 34) 30%, rgb(6, 20, 52));",
        }}
      >
        <div className="absolute inset-x-14 bottom-8">
          <div className="flex flex-row gap-4 justify-between items-center mx-h-fit font-sans origin-bottom ">
            <div className="justify-start flex flex-row gap-5">
              <Button
                variant="orange"
                className="flex flex-row gap-2 items-center"
              >
                <ViewVerticalIcon className="w-5 h-6 text-orange-400" />
                Documentation
              </Button>
              <Button
                href={"/ai"}
                variant="red"
                className="flex flex-row gap-2 items-center"
              >
                <CubeIcon className="w-5 h-6 text-red-400" />
                Try AI
              </Button>
            </div>
            <div className="justify-center">
              <Button variant={"blue"} onClick={() => scrollTo(aboutRef)}>
                <ChevronDownIcon className="w-5 h-6 text-indigo-400" />
              </Button>
            </div>
            <div className="justify-end flex flex-row gap-5">
              <Button
                variant="green"
                className="flex flex-row gap-2 items-center"
              >
                <PersonIcon className="w-5 h-6 text-green-400" />
                Join the Beta
              </Button>
              <Button
                href={"/signin"}
                variant={"yellow"}
                className="flex flex-row gap-2 items-center"
              >
                <EnterIcon className="w-5 h-6 text-yellow-400" />
                Sign in
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center overflow-hidden border-2 border-[#061434] bg-[#061434] shadow-lg shadow-darkBlue-900/20 inset-4 sm:inset-6 lg:inset-12 !bottom-36 md:!bottom-24 rounded-3xl">
          <div className="absolute text-7xl font-bold">CS Predicter</div>
          <Image
            className="opacity-30"
            src={"/background.png"}
            fill
            alt="background"
          />
          <Banner />
        </div>
      </div>
      <div className="relative w-full">
        <div className="fixed inset-x-0 top-0 z-[1] border-white/5 p-4 px-6 max-xl:bg-[#060522] max-lg:border-b md:px-12">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-5">
              <Button
                variant="orange"
                className="flex flex-row gap-2 items-center"
              >
                <ViewVerticalIcon className="w-5 h-6 text-orange-400" />
                Documentation
              </Button>
              <Button
                variant="red"
                className="flex flex-row gap-2 items-center"
              >
                <CubeIcon className="w-5 h-6 text-red-400" />
                Try AI
              </Button>
            </div>
            <div className="flex flex-row gap-5">
              <Button variant="green" className="flex flex-row gap-2">
                <PersonIcon className="w-5 h-6 text-green-400" />
                Join the Beta
              </Button>
              <Button
                variant={"yellow"}
                className="flex flex-row gap-2 items-center"
              >
                <EnterIcon className="w-5 h-6 text-yellow-400" />
                Sign in
              </Button>
            </div>
          </div>
        </div>
        <div ref={aboutRef} className="mx-auto relative w-full max-w-4xl pt-32">
          <section className="relative flex flex-col gap-8 text-slate-300">
            <h1 className="text-3xl flex flex-row leading-none items-center gap-2">
              <InfoCircledIcon className="h-7 w-7 text-teal-500" />
              About
            </h1>
            <div className="px-8">
              <span className="text-blue-100 text-lg">
                Cs Predicter is a school project made for our machine learning
                lecture. Idea inspired by the blast pro series ai prediction.
                <br />
                <br />
                We are a group of 2 students who are passionate about gaming and
                machine learning. We wanted to combine our passion and create
                something that we can use in our daily lives. We hope you enjoy
                our project and find it useful.
              </span>
            </div>
          </section>
          <div className="py-32 flex justify-center">
            <hr className="border-gray-400/20 w-96" />
          </div>
          <section className="relative flex flex-col gap-8 text-slate-300">
            <h1 className="text-3xl flex flex-row leading-none items-center gap-2">
              <PersonIcon className="h-7 w-7 text-purple-500" />
              Creators
            </h1>
            <div className="px-8">
              <span className="text-blue-100 text-lg">
                2 students from Denmark who are passionate, currently studying
                Software Development.
              </span>
            </div>
          </section>
          <div className="py-32 flex justify-center">
            <hr className="border-gray-400/20 w-96" />
          </div>
          <section className="relative flex flex-col gap-8 text-slate-300">
            <h1 className="text-3xl flex flex-row leading-none items-center gap-2">
              <EnvelopeClosedIcon className="h-7 w-7 text-yellow-500" />
              Contact
            </h1>
            <div className="px-8">
              <span className="text-blue-100 text-lg">
                For any questions or inquiries, please contact us via github:
                <div className="flex flex-col pt-2 underline text-[#67B4EB]">
                  <Link
                    href={"https://github.com/bentsen"}
                    className="cursor-pointer"
                  >
                    https://github.com/bentsen
                  </Link>
                  <Link
                    href={"https://github.com/agerholme"}
                    className="cursor-pointer"
                  >
                    https://github.com/agerholme
                  </Link>
                </div>
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
