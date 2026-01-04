"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function AiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine back link destination
  // If we are exactly at "/ai", go back to root "/"
  // If we are deeper (e.g. "/ai/cs-round-predictor"), go back to "/ai"
  const backHref = pathname === "/ai" ? "/" : "/ai";

  return (
    <>
      <Link
        href={backHref}
        className="fixed top-8 left-8 z-50 p-2.5 bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-full text-slate-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </Link>
      {children}
    </>
  );
}
