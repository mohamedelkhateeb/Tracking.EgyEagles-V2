import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import BreadcrumbComponent from "./global/breadcrumb-compo";

const Header = () => {
  return (
    <header className="flex sticky top-0 z-50 bg-white h-12 shrink-0 items-center border-b">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadcrumbComponent />
      </div>
    </header>
  );
};

export default Header;
