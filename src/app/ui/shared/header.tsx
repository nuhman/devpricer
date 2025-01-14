"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-blue-600"
      : "text-gray-600 hover:text-gray-900";
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                DevPricer
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${pathname === "/" ? "border-blue-500" : "border-transparent"}
                  ${isActive("/")} text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                href="/create"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${
                    pathname === "/create"
                      ? "border-blue-500"
                      : "border-transparent"
                  }
                  ${isActive("/create")} text-sm font-medium`}
              >
                Create Proposal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${
                pathname === "/"
                  ? "border-blue-500 bg-blue-50"
                  : "border-transparent"
              }
              ${isActive("/")}`}
          >
            Home
          </Link>
          <Link
            href="/create"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${
                pathname === "/create"
                  ? "border-blue-500 bg-blue-50"
                  : "border-transparent"
              }
              ${isActive("/create")}`}
          >
            Create Proposal
          </Link>
        </div>
      </div>
    </nav>
  );
}
