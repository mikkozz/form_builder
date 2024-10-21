import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import { Progress } from "@/components/ui/progress";
import CreateForm from "./CreateForm";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();
  useEffect(() => {}, [path]);
  return (
    <div className="h-screen border-r border-r-neutral-100 flex flex-col space-y-[22rem]">
      <div className="p-4">
        {menuList.map((menu, index) => (
          <div
            key={index}
            className={`my-3 p-2 rounded-md cursor-pointer hover:bg-neutral-200 transition-all ease-in-out ${
              path == menu.path && "bg-neutral-200"
            }`}
          >
            <h2 className="flex items-center gap-3 font-medium text-sm">
              <menu.icon className="w-4 h-4" />
              {menu.name}
            </h2>
          </div>
        ))}
      </div>
      <div className="p-4 flex flex-col gap-3">
        <CreateForm />
        <div>
          <Progress value={33} />
          <h2 className="text-sm mt-2 text-neutral-600">
            <strong>2</strong> out of <strong>3</strong> file created
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
