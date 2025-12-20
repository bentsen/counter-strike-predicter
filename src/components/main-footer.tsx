import Link from "next/link";
import { Github, Twitter, Disc, Bot, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#060522] text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Column */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Bot className="h-8 w-8 text-indigo-500" />
              <span className="text-xl font-bold">CS Predicter</span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-slate-400">
              Advanced AI-powered match analysis for Counter-Strike. Built by
              gamers, for gamers.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/bentsen"
                className="text-slate-400 hover:text-white transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Product
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/ai"
                      className="text-sm leading-6 hover:text-white transition-colors"
                    >
                      Try AI
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      className="text-sm leading-6 hover:text-white transition-colors"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/documentation"
                      className="text-sm leading-6 hover:text-white transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 hover:text-white transition-colors"
                    >
                      Creators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/5 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-slate-500">
            &copy; {new Date().getFullYear()} CS Predicter. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>in Denmark</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
