"use client";
import React, { useEffect, useState } from "react";
import { BreadcrumbWithCustomSeparator } from "./breadcrumb";
import Image from "next/image";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";

interface menu {
  id: number;
  name: string;
  icon: string;
  path: string;
}

function Header({ menus }: { menus: menu[] }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuStatus, setMenuStatus] = useState(false);
    const pathname = usePathname();
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
    <div className="w-full h-18.5  mx-auto flex justify-between items-center border-b-1 ">
      <div className="hidden sm:block">
        <BreadcrumbWithCustomSeparator />
      </div>
      <div className=" pt-5 ml-5  sm:hidden max-w-[50%]  flex justify-between items-center">
        <Image
          src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
          width={150}
          height={90}
          alt="logo"
          className=" mb-5 "
        />
      </div>
      <div className=" flex sm:w-1/8    justify-end gap-3">
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="hidden sm:flex  h-10 w-10  justify-center items-center  rounded-full bg-gray-200 dark:bg-gray-400 text-black dark:text-white cursor-pointer"
        >
          {theme === "light" ? <MdDarkMode /> : <IoMdSunny />}
        </div>
        <div className="hidden sm:flex h-10 w-10 rounded-full dark:bg-gray-400 bg-secondary mr-10  justify-center items-center text-xl font-medium text-white">
          G
        </div>
        <div className="mr-5 flex sm:hidden  h-10 w-10   justify-center items-center"
        onClick={()=>setMenuStatus(pre=>!pre)}
        >
          {!menuStatus ? <IoMenuSharp size={20}/> : <IoMdClose size={20}/>}
        </div>
      </div>
    </div>
      {menuStatus && (
        <div className="w-1/2  h-auto block z-10 sm:hidden bg-white shadow-gray shadow-md rounded-lg  absolute right-5">
          {menus.map((item: any, index: number) => {

            const isActive = pathname.startsWith(item.path);
            const Icon = (Icons as any)[item.icon] ?? Icons.LayoutIcon;
            return (
              <Link href={item.path} key={item.id} passHref onClick={()=>setMenuStatus(false)}>
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
      )}
      </>
  );
}

export default Header;
