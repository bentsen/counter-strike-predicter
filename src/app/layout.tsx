import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import FooterWrapper from "@/components/footer-wrapper";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Midcontrol",
  description:
    "Advanced AI-powered prediction model for Counter-Strike match outcomes. Take control of the game with Midcontrol.",
  keywords: [
    "CS2",
    "Counter-Strike",
    "Esports",
    "AI Prediction",
    "Match Analytics",
    "Machine Learning",
  ],
  openGraph: {
    title: "Midcontrol",
    description:
      "Advanced AI-powered prediction model for Counter-Strike match outcomes. Take control of the game with Midcontrol.",
    type: "website",
    locale: "en_US",
    siteName: "Midcontrol",
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
