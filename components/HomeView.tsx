import React from 'react';
import { Button } from './Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HomeViewProps {
  onSignupClick: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSignupClick }) => {
  return (
    <main className="flex-1 bg-white">
      {/* Hero Section */}
      <div className="relative isolate pt-14 lg:pt-20 overflow-hidden h-[calc(100vh-64px)] flex flex-col justify-center">
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
              Build something <span className="text-primary-600">awesome</span> today.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 mb-8">
              Experience the future of web development with our state-of-the-art platform. Fast, secure, and incredibly user-friendly. Join thousands of happy users today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button onClick={onSignupClick} size="lg" className="rounded-full px-8 shadow-lg shadow-primary-500/20">
                Get started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-12 flex justify-center gap-8 text-slate-500">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-primary-500" />
                 <span>Free Tier</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-primary-500" />
                 <span>No Credit Card</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-primary-500" />
                 <span>Open Source</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};