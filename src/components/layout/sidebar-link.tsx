"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarLinkProps {
    href: string;
    icon: ReactNode;
    children: ReactNode;
}

export function SidebarLink({ href, icon, children }: SidebarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href + '/');

    return (
        <li>
            <Link 
                href={href} 
                className={`relative flex flex-row items-center h-12 px-6 focus:outline-none transition-colors group border-l-4 ${
                    isActive 
                        ? 'bg-slate-800/50 border-blue-500 text-white' 
                        : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50 hover:border-blue-500'
                }`}
            >
                <span className={`inline-flex justify-center items-center transition-colors ${
                    isActive ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-500'
                }`}>
                    {icon}
                </span>
                <span className="ml-3 text-sm font-medium tracking-wide truncate">
                    {children}
                </span>
            </Link>
        </li>
    );
}
