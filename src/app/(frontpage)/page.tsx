"use client";

import Banner from "./Banner";
import UnifiedStickyHeader from "../../components/unified-sticky-header";
import { Info, User, Mail } from "lucide-react";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function Home() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const scrollTo = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [shouldAnimate, setShouldAnimate] = React.useState(false);

  React.useEffect(() => {
    let raf1: number;
    let raf2: number;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="relative h-screen w-screen">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(0deg, rgb(6, 5, 34) 30%, rgb(6, 20, 52))",
          }}
        />
        <motion.div
          layout
          transition={{
            duration: 1,
            delay: 0.5,
            ease: "easeInOut",
            stiffness: 60,
            damping: 20,
          }}
          className={cn(
            "absolute z-[60] flex items-center justify-center overflow-hidden bg-[#061434]",
            shouldAnimate
              ? "pointer-events-auto inset-4 border-2 border-[#061434] shadow-lg shadow-darkBlue-900/20 !bottom-36 rounded-3xl sm:inset-6 md:!bottom-24 lg:inset-12"
              : "inset-0 h-screen w-screen"
          )}
        >
          <Banner />
        </motion.div>
      </div>

      <UnifiedStickyHeader
        className="-mt-24"
        onScrollToAbout={() => scrollTo(aboutRef)}
      />

      <div className="relative w-full">
        <div
          ref={aboutRef}
          className="mx-auto relative w-full max-w-4xl pt-32 pb-32"
        >
          <section className="relative flex flex-col gap-8 text-slate-300">
            <h1 className="text-3xl flex flex-row leading-none items-center gap-2">
              <Info className="h-7 w-7 text-teal-500" />
              About
            </h1>
            <div className="px-8">
              <span className="text-blue-100 text-lg leading-relaxed">
                <strong className="font-semibold text-white">Midcontrol</strong>{" "}
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
                    target="_blank"
                    className="cursor-pointer"
                  >
                    https://github.com/bentsen
                  </Link>
                  <Link
                    href={"https://github.com/Philippe16"}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    https://github.com/Philippe16
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
