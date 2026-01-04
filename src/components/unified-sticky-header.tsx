"use client";

import React, { useEffect, useState, useRef } from "react";
import { BookOpen, Bot, ChevronDown, Backpack, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UnifiedStickyHeaderProps {
  onScrollToAbout?: () => void;
  className?: string;
}

export default function UnifiedStickyHeader({
  onScrollToAbout,
  className,
}: UnifiedStickyHeaderProps) {
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        className="relative -top-24 h-[1px] w-full pointer-events-none opacity-0"
      />
      <div
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-white/5 p-4 px-6 md:px-12",
          isStuck
            ? "bg-[#060522] border-b shadow-lg"
            : "bg-transparent border-transparent",
          className
        )}
      >
        <div className="flex flex-row justify-between items-center max-w-[1920px] mx-auto">
          {/* Left Side: Documentation & Try AI */}
          <div className="flex flex-row gap-5">
            <Button
              asChild
              variant="orange"
              className="flex flex-row gap-2 items-center"
            >
              <Link href={"/documentation"}>
                <BookOpen className="w-5 h-6 text-orange-400" />
                Documentation
              </Link>
            </Button>
            <Button
              asChild
              variant="red"
              className="flex flex-row gap-2 items-center"
            >
              <Link href={"/ai"}>
                <Bot className="w-5 h-6 text-red-400" />
                Try AI
              </Link>
            </Button>
          </div>

          {/* Center: Scroll Down Chevron */}
          <div
            className={cn(
              "justify-center transition-opacity duration-100",
              isStuck ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <Button variant="blue" onClick={onScrollToAbout}>
              <ChevronDown className="w-5 h-6 text-indigo-400" />
            </Button>
          </div>

          {/* Right Side: Shop & Sign In */}
          <div className="flex flex-row gap-5">
            <Button
              asChild
              variant="green"
              className="flex flex-row gap-2 items-center"
            >
              <Link href={"/shop"}>
                <Backpack className="w-5 h-6 text-green-400" />
                Shop
              </Link>
            </Button>
            <Button
              asChild
              variant="yellow"
              className="flex flex-row gap-2 items-center"
            >
              <Link href={"/signin"}>
                <LogIn className="w-5 h-6 text-yellow-400" />
                Sign in
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
