"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScaleIcon, BarChart2Icon, VideoIcon } from "lucide-react";

const navItems = [
  { href: "/",          label: "Tiebreaker",      icon: ScaleIcon },
  { href: "/dashboard", label: "Sales Dashboard",  icon: BarChart2Icon },
  { href: "/ideas",     label: "Content Engine",   icon: VideoIcon },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center gap-6">
        <span className="text-sm font-semibold text-[#0a0a0a] tracking-tight mr-2">Vibe Apps</span>
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#0a0a0a] text-white"
                    : "text-[#6a6a6a] hover:bg-[#f5f0e0] hover:text-[#0a0a0a]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
