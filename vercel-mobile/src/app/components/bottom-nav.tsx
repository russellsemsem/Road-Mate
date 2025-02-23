// src/app/components/bottom-nav.tsx
'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book } from 'lucide-react';

// Custom Circle SVG Component
const GradientCircle = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-7 h-7"
  >
    <defs>
      <radialGradient
        id="circleGradient"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stopColor="#1E40AF" /> {/* Darker blue */}
        <stop offset="70%" stopColor="#2563EB" /> {/* Medium blue */}
        <stop offset="100%" stopColor="#3B82F6" /> {/* Lighter blue */}
      </radialGradient>
    </defs>
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="url(#circleGradient)"
    />
  </svg>
);

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center h-16 px-8">
        {/* Book Icon */}
        <Link 
          href="/dashboard/knowledge" 
          className={`flex flex-col items-center justify-center p-2
            ${pathname === '/dashboard' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Book size={24} />
        </Link>
        
        {/* Circle Button (Middle) */}
        <Link 
          href="/dashboard" 
          className="flex items-center justify-center p-3 bg-blue-500 rounded-full -mt-6 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <GradientCircle />
        </Link>

        {/* Profile Button */}
        <div className="p-2">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }}
          />
        </div>
      </div>
    </nav>
  );
}