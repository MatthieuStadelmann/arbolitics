"use client";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { clearAuth } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export function NavBar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <nav className="bg-[#2B4C15]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/arbolitics.svg"
                alt="Arbolitics"
                width={120}
                height={32}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center gap-6">
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-white hover:text-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 