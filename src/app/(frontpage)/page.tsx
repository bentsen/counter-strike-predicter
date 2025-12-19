"use client";

import Banner from "./Banner";
import Button from "../../components/ui/button";
import {
  ChevronDown,
  Box,
  BookOpen,
  LogIn,
  Info,
  User,
  Mail,
  Backpack,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
            "linear-gradient(0deg, rgb(6, 5, 34) 30%, rgb(6, 20, 52))",
        }}
      >
        <div className="absolute inset-x-14 bottom-8">
          <div className="flex flex-row gap-4 justify-between items-center mx-h-fit font-sans origin-bottom ">
            <div className="justify-start flex flex-row gap-5">
              <Button
                variant="orange"
                className="flex flex-row gap-2 items-center"
              >
                <BookOpen className="w-5 h-6 text-orange-400" />
                Documentation
              </Button>
              <Button
                href={"/ai"}
                variant="red"
                className="flex flex-row gap-2 items-center"
              >
                <Box className="w-5 h-6 text-red-400" />
                Try AI
              </Button>
            </div>
            <div className="justify-center">
              <Button variant={"blue"} onClick={() => scrollTo(aboutRef)}>
                <ChevronDown className="w-5 h-6 text-indigo-400" />
              </Button>
            </div>
            <div className="justify-end flex flex-row gap-5">
              <Button
                href={"/shop"}
                variant="green"
                className="flex flex-row gap-2 items-center"
              >
                <Backpack className="w-5 h-6 text-green-400" />
                Shop
              </Button>
              <Button
                href={"/signin"}
                variant={"yellow"}
                className="flex flex-row gap-2 items-center"
              >
                <LogIn className="w-5 h-6 text-yellow-400" />
                Sign in
              </Button>
            </div>
          </div>
        </div>
        <motion.div
          initial={{
            width: "100vw",
            height: "100vh",
            inset: 0,
          }}
          animate={{
            width: "auto",
            height: "auto",
            left: "3rem",
            right: "3rem",
            top: "3rem",
          }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute flex items-center justify-center overflow-hidden border-2 border-[#061434] bg-[#061434] shadow-lg shadow-darkBlue-900/20 inset-4 sm:inset-6 lg:inset-12 !bottom-36 md:!bottom-24 rounded-3xl"
        >
          <Banner />
        </motion.div>
      </div>
      <div className="relative w-full">
        <div className="fixed inset-x-0 top-0 z-[1] border-white/5 p-4 px-6 max-xl:bg-[#060522] max-lg:border-b md:px-12">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-5">
              <Button
                variant="orange"
                className="flex flex-row gap-2 items-center"
              >
                <BookOpen className="w-5 h-6 text-orange-400" />
                Documentation
              </Button>
              <Button
                variant="red"
                className="flex flex-row gap-2 items-center"
              >
                <Box className="w-5 h-6 text-red-400" />
                Try AI
              </Button>
            </div>
            <div className="flex flex-row gap-5">
              <Button
                href="/shop"
                variant="green"
                className="flex flex-row gap-2"
              >
                <Backpack className="w-5 h-6 text-green-400" />
                Shop
              </Button>
              <Button
                variant={"yellow"}
                className="flex flex-row gap-2 items-center"
              >
                <LogIn className="w-5 h-6 text-yellow-400" />
                Sign in
              </Button>
            </div>
          </div>
        </div>
        <div ref={aboutRef} className="mx-auto relative w-full max-w-4xl pt-32">
          <section className="relative flex flex-col gap-8 text-slate-300">
            <h1 className="text-3xl flex flex-row leading-none items-center gap-2">
              <Info className="h-7 w-7 text-teal-500" />
              About
            </h1>
            <div className="px-8">
              <span className="text-blue-100 text-lg leading-relaxed">
                <strong className="font-semibold text-white">
                  CS Predicter
                </strong>{" "}
                began as a machine learning research project, inspired by the
                BLAST Pro Series AI prediction model. What started as an
                academic experiment has evolved into a sophisticated tool for
                analyzing Counter-Strike match outcomes.
                <br />
                <br />
                We are a duo of software engineering students combining our
                passion for competitive gaming with advanced data analytics. Our
                goal is to provide accessible, high-quality match insights for
                the community.
              </span>
            </div>
          </section>
          <div className="py-32 flex justify-center">
            <hr className="border-gray-400/20 w-96" />
          </div>
          <section className="relative flex flex-col gap-8 text-slate-300">
            <h1 className="text-3xl flex flex-row leading-none items-center gap-2">
              <User className="h-7 w-7 text-purple-500" />
              Creators
            </h1>
            <div className="px-8">
              <span className="text-blue-100 text-lg">
                Built by two software engineering students from Denmark with a
                shared passion for competitive gaming and artificial
                intelligence.
              </span>
            </div>
          </section>
          <div className="py-32 flex justify-center">
            <hr className="border-gray-400/20 w-96" />
          </div>
          <section className="relative flex flex-col gap-8 text-slate-300">
            <h1 className="text-3xl flex flex-row leading-none items-center gap-2">
              <Mail className="h-7 w-7 text-yellow-500" />
              Contact
            </h1>
            <div className="px-8">
              <span className="text-blue-100 text-lg">
                Have questions or feedback? Connect with us on GitHub:
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
