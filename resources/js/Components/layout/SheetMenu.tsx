import { MenuIcon } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Menu } from "@/Components/layout/Menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/Components/ui/sheet";
import LogoV1 from "../LogoV1";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <div className="flex items-center justify-center h-14">
            <LogoV1 className="size-12" />
            <h1 className="font-bold">POSTIFY</h1>
          </div>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
