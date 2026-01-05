import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-800/20 text-indigo-50 hover:bg-indigo-800 backdrop-blur-sm outline-[#09073a]/50 border border-transparent hover:border-[#09073a]/50 shadow-sm",
        orange:
          "bg-orange-900/20 text-orange-50 hover:bg-orange-900 backdrop-blur-sm outline-[#09073a]/50 border border-transparent hover:border-[#09073a]/50 shadow-sm",
        red: "bg-rose-900/20 text-rose-50 hover:bg-rose-900 backdrop-blur-sm outline-[#09073a]/50 border border-transparent hover:border-[#09073a]/50 shadow-sm",
        green:
          "bg-emerald-900/20 text-emerald-50 hover:bg-emerald-900 backdrop-blur-sm outline-[#09073a]/50 border border-transparent hover:border-[#09073a]/50 shadow-sm",
        yellow:
          "bg-yellow-900/20 text-yellow-50 hover:bg-yellow-900 backdrop-blur-sm outline-[#09073a]/50 border border-transparent hover:border-[#09073a]/50 shadow-sm",
        blue: "bg-blue-500/20 text-blue-50 hover:bg-blue-600/20 backdrop-blur-sm outline-[#09073a]/50 border border-transparent hover:border-[#09073a]/50 shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-3 text-base",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
