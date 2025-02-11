import { Sidebar } from "@/Components/layout/Sidebar";
import { useSidebar } from "@/Components/layout/sidebar-hooks/use-sidebar";
import { useStore } from "@/Components/layout/sidebar-hooks/use-store";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;

  
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-screen bg-foreground/5 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        {children}
      </main>
    </>
  );
}
