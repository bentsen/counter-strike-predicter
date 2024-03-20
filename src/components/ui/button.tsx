import { cva, type VariantProps } from "class-variance-authority";
import cn from "../../utils/cn";
import React from "react";
import Link from "next/link";

const ButtonVariants = cva(
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
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, href, ...props }, ref) => {
    return href ? (
      <Link href={href}>
        <button
          className={cn(ButtonVariants({ variant, className }))}
          ref={ref}
          {...props}
        />
      </Link>
    ) : (
      <button
        className={cn(ButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
