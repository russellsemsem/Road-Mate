// src/app/components/bottom-nav.tsx
'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Circle } from 'lucide-react';

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
          <Circle size={28} className="text-white" />
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