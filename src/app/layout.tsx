import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import FooterWrapper from "@/components/footer-wrapper";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MidControl",
  description:
    "Advanced AI-powered prediction model for Counter-Strike match outcomes. Take control of the game with MidControl.",
  keywords: [
    "CS2",
    "Counter-Strike",
    "Esports",
    "AI Prediction",
    "Match Analytics",
    "Machine Learning",
  ],
  openGraph: {
    title: "MidControl",
    description:
      "Advanced AI-powered prediction model for Counter-Strike match outcomes. Take control of the game with MidControl.",
    type: "website",
    locale: "en_US",
    siteName: "MidControl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "bg-[#060522] overflow-hidden h-screen")}
      >
        <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden bg-[#060522] font-mono">
          <main className="flex-grow w-full relative">{children}</main>
          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}
