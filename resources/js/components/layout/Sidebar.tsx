import { Menu } from "@/components/layout/Menu";
import { SidebarToggle } from "@/components/layout/SidebarToggle";
import { useSidebar } from "@/components/layout/sidebar-hooks/use-sidebar";
import { useStore } from "@/components/layout/sidebar-hooks/use-store";
import { cn } from "@/lib/utils";
import LogoV1 from "../LogoV1";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 pb-2 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <div className="flex items-center justify-center h-14">
          <LogoV1 className="size-12" />
          <h1 className="font-bold">POSTIFY</h1>
        </div>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
