import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiTruckTrailer } from "react-icons/pi";
import { LiaUsersCogSolid } from "react-icons/lia";
import { FaCodeBranch } from "react-icons/fa";

export function NavMain() {
  const location = useLocation();

  const pathname = location.pathname;

  const navItems: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    isActive: boolean;
    items: { title: string; href: string; icon: string }[];
  }[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: LuLayoutDashboard,
      label: "dashboard",
      isActive: false,
      items: [],
    },
    {
      title: "Manage Distributors",
      href: "/distributors",
      icon: LiaUsersCogSolid,
      label: "distributors",
      isActive: false,
      items: [],
    },
    {
      title: "Manage Customers",
      href: "/customers",
      icon: LiaUsersCogSolid,
      label: "customers",
      isActive: false,
      items: [],
    },
    {
      title: "Manage Branches",
      href: "/branches",
      icon: FaCodeBranch,
      label: "branches",
      isActive: false,
      items: [],
    },

    {
      title: "Vehicles",
      href: "/vehicles",
      icon: PiTruckTrailer,
      label: "vehicles",
      isActive: false,
      items: [],
    },
    {
      title: "User Management",
      href: "/users",
      icon: LiaUsersCogSolid,
      label: "users",
      isActive: false,
      items: [
        {
          title: "users",
          href: "/users",
          icon: "user",
        },
        {
          title: "Group Users",
          href: "/users/groups",
          icon: "user",
        },
      ],
    },
  ];
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map((item) => {
          return item?.items && item?.items?.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="text-base font-semibold"
                    tooltip={item.title}
                    isActive={pathname === item.label}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === subItem.href}
                        >
                          <Link to={subItem.href}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname == item.href}
                className="text-base font-semibold"
              >
                <Link to={item.href || "/"}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
