import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

export function AppSidebar({ items }) {
  return (
    <Sidebar collapsible="none">
      <SidebarInset>
        <SidebarContent className="px-4 py-10 shadow-2xl">
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl text-gray-800 pb-4 rounded-none border-b">
              NGO Portal
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-4 py-10 text-xl">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarInset>
    </Sidebar>
  );
}
