"use client";
import React from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
 
interface menu {
  id: number;
  name: string;
  // store icon as a serializable string key (name of the lucide-react icon)
  icon: string;
  path: string;
}

function Sidebar({ menus }: { menus: menu[] }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  

  return (
    <div className="dark:bg-[#0a0a0a] bg-white w-full h-screen border shadow-md pt-5 px-2 ">
      <div className="">
        <Image
          src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
          width={180}
          height={90}
          alt="logo"
          className="mx-auto mb-5 "
        />
        <hr className="mt-5 mb-2 w-[95%] mx-auto" />

        {menus.map((item: any, index: number) => {

          const isActive = pathname.startsWith(item.path);
          const Icon = (Icons as any)[item.icon] ?? Icons.LayoutIcon;
          return (
            <Link href={item.path} key={item.id} passHref>
              <h2
                className={`flex items-center pl-4 gap-3 h-12 cursor-pointer transition-all rounded-lg text-slate-500 capitalize ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-500 hover:bg-slate-200 hover:text-black"
                }`}
              >
                <Icon />
                {item.name}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
