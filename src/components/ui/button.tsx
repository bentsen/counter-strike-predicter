import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-auto py-3 px-5 rounded-full font-bold text-base",
  {
    variants: {
      variant: {
        default:
          "w-fit basis-1 gap-2 justify-center items-center p-2 px-5 min-w-max text-sm font-bold text-center hover:bg-opacity-100 active:bg-opacity-90 rounded-full backdrop-blur-sm transition-all md:text-base outline-[#09073a]/50 hidden bg-indigo-800/20 hover:bg-indigo-800 md:block",
        orange:
          "flex w-fit basis-1 gap-2 justify-center items-center p-2 px-5 min-w-max text-sm font-bold text-center hover:bg-opacity-100 active:bg-opacity-90 rounded-full backdrop-blur-sm transition-all md:text-base outline-[#09073a]/50 bg-orange-900/20 text-orange-50 hover:bg-orange-900",
        red: "flex w-fit basis-1 gap-2 justify-center items-center p-2 px-5 min-w-max text-sm font-bold text-center hover:bg-opacity-100 active:bg-opacity-90 rounded-full backdrop-blur-sm transition-all md:text-base outline-[#09073a]/50 bg-rose-900/20 text-rose-50 hover:bg-rose-900",
        green:
          "flex w-fit basis-1 gap-2 justify-center items-center p-2 px-5 min-w-max text-sm font-bold text-center hover:bg-opacity-100 active:bg-opacity-90 rounded-full backdrop-blur-sm transition-all md:text-base outline-[#09073a]/50 bg-emerald-900/20 text-emerald-50 hover:bg-emerald-900",
        yellow:
          "flex w-fit basis-1 gap-2 justify-center items-center p-2 px-5 min-w-max text-sm font-bold text-center hover:bg-opacity-100 active:bg-opacity-90 rounded-full backdrop-blur-sm transition-all md:text-base outline-[#09073a]/50 bg-yellow-900/20 text-yellow-50 hover:bg-yellow-900",
        blue: "bg-blue-500/20 text-blue-50 hover:bg-blue-600/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
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
