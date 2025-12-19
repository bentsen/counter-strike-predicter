"use client";

import Button from "@/components/ui/button";
import { ChevronLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Ai = () => {
  return (
    <div className="min-h-screen w-full bg-[#061434] relative overflow-hidden flex flex-col">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,20,52,1) 0%, rgba(6,5,34,1) 100%)",
        }}
      />

      {/* Floating Orbs for atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <div className="relative z-10 w-full p-6 md:p-10 flex justify-between items-center">
        <Button
          href="/"
          variant="yellow"
          className="flex items-center gap-2 group"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center max-w-7xl mx-auto w-full px-6 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Tools
            </span>
          </h1>
          <p className="text-blue-200/80 text-lg md:text-xl max-w-2xl mx-auto">
            Leverage our advanced machine learning models to predict match
            outcomes and analyze gameplay.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Card
            src="/ai_round_predictor_background.png"
            href="/ai/cs-round-predictor"
            title="Round Predictor"
            delay={0.1}
          >
            Input specific match scenarios and let our neural network predict
            the most likely winner based on historical data.
          </Card>

          <Card
            src="/ai_chatbot_background.png"
            href="/ai/cs-chat"
            title="AI Analyst"
            delay={0.2}
          >
            Your personal Esports assistant. Ask questions about strategies,
            mechanics, or historical stats.
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
  delay = 0,
}: {
  title: string;
  src: string;
  href: string;
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Link href={href} className="block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
          {/* Image Section */}
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#061434] to-transparent z-10 opacity-60" />
            <Image
              src={src}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              alt={title}
            />
          </div>

          {/* Content Section */}
          <div className="p-6 relative z-20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {title}
              </h3>
              <ArrowRight className="w-6 h-6 text-white/50 transform -translate-x-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-300" />
            </div>
            <p className="text-blue-100/70 leading-relaxed">{children}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Ai;
