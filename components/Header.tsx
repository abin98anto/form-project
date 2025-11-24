import React from 'react';
import { Page, User } from '../types';
import { Button } from './Button';
import { Rocket, LogOut, UserPlus } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  userData: User | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, userData, onNavigate, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-primary-600 p-1.5 rounded-lg group-hover:bg-primary-700 transition-colors">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Awesome App
            </span>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            {currentPage === 'home' && !userData && (
              <Button 
                onClick={() => onNavigate('signup')}
                variant="primary"
                size="sm"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            )}

            {(currentPage === 'success' || userData) && currentPage !== 'signup' && (
              <div className="flex items-center gap-4">
                {userData && (
                  <span className="text-sm font-medium text-slate-600 hidden sm:block">
                    Hi, {userData.firstName}
                  </span>
                )}
                <Button 
                  onClick={onLogout}
                  variant="secondary"
                  size="sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};