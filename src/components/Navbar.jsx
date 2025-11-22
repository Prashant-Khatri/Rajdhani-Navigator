"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const navItems = [
    { label: "Find Route", href: "/" },
    { label: "View Map", href: "/map" },
  ];

  return (
    <nav className="w-full bg-black/60 text-white backdrop-blur-md shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="font-bold text-lg">🚇 Rajdhani Navigator</h1>

      <div className="flex gap-6">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:text-yellow-300 transition ${
              path === item.href ? "text-yellow-300 font-semibold" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
