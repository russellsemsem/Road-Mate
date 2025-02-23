import { Conversation } from './components/conversation';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8">
      <div className="w-full max-w-2xl pt-8 sm:pt-16">
        <div className="space-y-1 mb-8 sm:mb-20">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">
            RoadMate
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 text-center">
            Driving Companion
          </p>
        </div>
        <Conversation />
      </div>
    </main>
  );
}