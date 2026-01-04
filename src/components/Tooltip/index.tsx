import { ReactNode } from "react";

import * as RTooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const Tooltip = ({
  children,
  tooltip,
  className,
}: {
  children: ReactNode;
  tooltip: ReactNode;
  className?: string;
}) => {
  return (
    <RTooltip.Provider delayDuration={300}>
      <RTooltip.Root>
        <RTooltip.Trigger type="button" tabIndex={-1}>
          {children}
        </RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content
            sideOffset={5}
            className={cn(
              "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade pointer-events-none z-50",
              className
            )}
          >
            <div className="pointer-events-none rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1.5 text-sm text-neutral-900 shadow-lg">
              {tooltip}
            </div>
            <RTooltip.Arrow className="fill-neutral-300" />
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
};

export default Tooltip;
