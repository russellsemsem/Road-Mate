'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { uploadKnowledgeBase, updateAgent } from '@/services/elevenlabs';

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const handleSignIn = async () => {
      if (isLoaded && isSignedIn) {
        try {
          const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '';
          const result = await uploadKnowledgeBase(apiKey);
          
          if (result.success && result.id) {
            localStorage.setItem('knowledgeBaseId', result.id);
            try {
              await updateAgent(apiKey);
            } catch (updateError) {
              console.error('Failed to update agent:', updateError);
            }
          }
          
          router.push('/dashboard');
        } catch (error) {
          console.error('Failed to upload knowledge base:', error);
          router.push('/dashboard');
        }
      }
    };

    handleSignIn();
  }, [isSignedIn, isLoaded, router]);

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