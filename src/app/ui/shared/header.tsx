"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-blue-600 border-blue-500"
      : "text-gray-600 hover:text-blue-600 border-transparent";
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  DevPricer
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors relative group
                  ${isActive("/")}`}
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link
                href="/create"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors relative group
                  ${isActive("/create")}`}
              >
                Create Proposal
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="flex items-center">
            <a
              href="https://github.com/nuhman/devpricer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1 bg-gray-50">
          <Link
            href="/"
            className={`block px-3 py-2 text-base font-medium transition-colors
              ${
                pathname === "/"
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 border-l-4 border-transparent"
              }`}
          >
            Home
          </Link>
          <Link
            href="/create"
            className={`block px-3 py-2 text-base font-medium transition-colors
              ${
                pathname === "/create"
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 border-l-4 border-transparent"
              }`}
          >
            Create Proposal
          </Link>
        </div>
      </div>
    </nav>
  );
}
