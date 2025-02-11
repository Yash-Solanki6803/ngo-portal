import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router";
import { AppSidebar } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import React from "react";
import { RootState } from "../../redux/store";

// import { AppSidebar } from "@/src/components/app-sidebar";

export type item = {
  title: string;
  url: string;
  icon: any;
};

export const DashboardLayout: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // Menu items.
  const volunteerItems: item[] = [
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
  const ngoItems: item[] = [
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
      title: "Manage NGO",
      url: "/dashboard/update-ngo",
      icon: Settings,
    },
  ];
  const devItems: item[] = [
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

  let items: item[] = [];
  if (userInfo.role === "volunteer") {
    items = volunteerItems;
  } else if (userInfo.role === "ngo") {
    items = ngoItems;
  } else if (userInfo.role === "dev") {
    items = devItems;
  }

  return (
    <SidebarProvider className="relative flex h-full">
      <AppSidebar items={items} />
      <section className="flex  w-full">
        <Outlet />
      </section>
    </SidebarProvider>
  );
};
