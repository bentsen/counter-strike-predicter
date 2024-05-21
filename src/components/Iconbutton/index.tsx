import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import cn from "@/utils/cn";
import Tooltip from "../Tooltip";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-black rounded-md p-1 outline-none transition-all duration-150",
  {
    variants: {
      variant: {
        default:
          "focus-visible:ring-2 focus-visible:ring-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",
        outline:
          "bg-transparent border bg-neutral-100 border-neutral-300 hover:bg-neutral-200 text-black",
        ghost: "bg-transparent hover:underline text-black",
      },
      size: {
        default: "h-7 w-7 text-md",
        sm: "h-5 w-5 text-sm",
        lg: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon: React.JSX.Element;
  tooltip?: ReactNode;
}

const IconButton = (props: ButtonProps) => {
  return (
    <>
      {props.tooltip ? (
        <Tooltip tooltip={props.tooltip}>
          <TheButton {...props}>{props.children}</TheButton>
        </Tooltip>
      ) : (
        <TheButton {...props}>{props.children}</TheButton>
      )}
    </>
  );
};

const TheButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <>
        <button
          {...props}
          ref={ref}
          type={props.type ?? "button"}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {props.icon} {props.children}
        </button>
      </>
    );
  }
);
TheButton.displayName = "TheButton";

export default IconButton;
