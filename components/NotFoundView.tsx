import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { FileQuestion } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 px-4 text-center">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full border border-slate-100">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-slate-400" />
        </div>
        
        <h2 className="text-4xl font-bold text-slate-900 mb-2">404</h2>
        <h3 className="text-xl font-semibold text-slate-700 mb-6">Page Not Found</h3>
        
        <p className="text-slate-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Button onClick={() => navigate('/')} variant="primary">
          Return Home
        </Button>
      </div>
    </div>
  );
};