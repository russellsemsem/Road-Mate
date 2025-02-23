// src/app/page.tsx
'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      redirect('/dashboard');
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-60 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
          Road Mate
        </h1>
      </div>
    </main>
  );
}