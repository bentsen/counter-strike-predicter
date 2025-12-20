"use client";

import { usePathname } from "next/navigation";
import Footer from "./main-footer";

const FooterWrapper = () => {
  const pathname = usePathname();

  // Hide footer on /ai routes
  if (pathname?.startsWith("/ai")) {
    return null;
  }

  return <Footer />;
};

export default FooterWrapper;
