import { Navbar } from "@/Components/layout/Navbar";
import { BreadcrumbItem } from "./NavBreadcrumb";

interface ContentLayoutProps {
  children: React.ReactNode;
  items?: BreadcrumbItem[];
}

export function ContentLayout({ children, items }: ContentLayoutProps) {
  return (
    <div>
      <Navbar items={items} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
