"use client";

// Finns ingen funktionalitet här. Detta är bara för UI
import { Clapperboard } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isFavoritesPage = pathname === "/favorites";

  return (
    <header className="border-b border-black/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl flex items-center gap-2 font-bold tracking-tight">
              <Clapperboard />
            </h1>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/"
                className={`font-semibold transition-colors ${isHomePage ? "text-black" : "text-neutral-500"}`}
                title="Home"
                aria-label="Home"
              >
                Home
              </Link>
              <Link
                href="/favorites"
                className={`font-semibold transition-colors ${isFavoritesPage ? "text-black" : "text-neutral-500"}`}
                title="Favorites"
                aria-label="Favorites"
              >
                Favorites
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                J
              </div>
              <span className="hidden sm:inline text-muted-foreground">
                Welcome back,
              </span>
              <span className="font-semibold">John</span>
            </div>
            <button className="cursor-pointer text-muted-foreground text-sm font-semibold text-neutral-500 px-2 py-1 rounded hover:bg-neutral-200 hover:text-black">Sign Out</button>
          </div>
        </div>
      </div>
    </header>
  );
}
