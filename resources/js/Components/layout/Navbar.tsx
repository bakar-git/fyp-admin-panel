import { UserNav } from "@/Components/layout/UserNav";
import { SheetMenu } from "@/Components/layout/SheetMenu";
import { BreadcrumbItem, NavBreadcrumb } from "./NavBreadcrumb";

export function Navbar({ items }: { items?: BreadcrumbItem[] }) {
  return (
    <header className="sticky top-0 z-10 w-full shadow dark:shadow-secondary bg-background/60">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <NavBreadcrumb items={items || []} itemsToDisplay={3} />
        </div>
        <div className="flex flex-1 items-center justify-end">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
