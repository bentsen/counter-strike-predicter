"use client";

import {
  ChevronLeft,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Signup = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] h-[400px] w-[400px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="z-10 w-full max-w-md px-6"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 text-3xl font-bold tracking-tight text-white"
            >
              Create Account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-400"
            >
              Join the community and start your journey
            </motion.p>
          </div>

          {/* Form */}
          <form className="space-y-4" action="#" method="POST">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-black/20 py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-black/20 py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-black/20 py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <ShieldCheck className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-black/20 py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            Already a member?
            <Link
              href="/signin"
              className="ml-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
