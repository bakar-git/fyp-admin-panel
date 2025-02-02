import { ChevronsLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible absolute top-1/2 -right-[16px] z-20">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-full w-8 h-8"
        variant="outline"
        size="icon"
      >
        <ChevronsLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
