"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Bottombar = () => {
  const pathname = usePathname();
  return (
    <div className="flex bottom-0 z-20 w-full bg-dark-1 px-6 py-3 items-center justify-between md:hidden">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.label}
            href={link.route}
            className={`flex gap-2 items-center rounded-lg py-2 px-4 ${
              isActive && "bg-purple-1"
            }`}
          >
            {link.icon}
            <p className="text-light-1 text-small-medium max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Bottombar;
