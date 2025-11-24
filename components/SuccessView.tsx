import React from 'react';
import { User } from '../types';
import { PartyPopper, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface SuccessViewProps {
  user: User;
  onGoHome: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ user, onGoHome }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 px-4 text-center">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full border border-slate-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <PartyPopper className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Hello {user.firstName}, welcome to our website.
        </h2>
        
        <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-slate-700 font-medium">Account created successfully</span>
          </div>
          <p className="text-slate-500 text-sm ml-7">
            A confirmation email has been sent to <span className="font-semibold text-slate-700">{user.email}</span>.
          </p>
        </div>

        <Button onClick={onGoHome} variant="outline" fullWidth>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};