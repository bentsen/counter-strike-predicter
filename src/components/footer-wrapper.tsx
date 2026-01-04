"use client";

import { usePathname } from "next/navigation";
import Footer from "./main-footer";

const FooterWrapper = () => {
  const pathname = usePathname();

  // Hide footer on /ai routes
  if (
    pathname?.startsWith("/ai") ||
    pathname?.startsWith("/signin") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/documentation")
  ) {
    return null;
  }

  return <Footer />;
};

export default FooterWrapper;
