import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router";
import { DeleteNGOBtn } from "../../components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";

function DashboardLayout() {
  const user = useSelector((state) => state.user);
  const userInfo = user.userInfo;

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // Menu items.
  const volunteerItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Create NGO",
      url: "/dashboard/create-ngo",
      icon: Inbox,
    },
  ];
  const ngoItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Start a Campaign",
      url: "/dashboard/campaigns/create",
      icon: Inbox,
    },
    {
      title: "Your Campaigns",
      url: "/dashboard/campaigns",
      icon: Calendar,
    },
    {
      title: "Volunteers List",
      url: "/dashboard/users",
      icon: Search,
    },
    {
      title: "Update NGO",
      url: "/dashboard/update-ngo",
      icon: Settings,
    },
  ];
  const devItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "All NGOs",
      url: "/dashboard/ngos",
      icon: Inbox,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Calendar,
    },
  ];

  let items = [];
  if (userInfo.role === "volunteer") {
    items = volunteerItems;
  } else if (userInfo.role === "ngo") {
    items = ngoItems;
  } else if (userInfo.role === "dev") {
    items = devItems;
  }

  return (
    <SidebarProvider className="relative  h-full overflow-y-hidden">
      <AppSidebar items={items} />
      <section className="flex  w-full">
        <Outlet />
      </section>
    </SidebarProvider>
  );
}

export default DashboardLayout;
