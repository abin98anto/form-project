import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { SignupView } from './components/SignupView';
import { SuccessView } from './components/SuccessView';
import { LogoutModal } from './components/LogoutModal';
import { Page, User } from './types';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [userData, setUserData] = useState<User | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Routing guard: prevent access to signup page if user is already logged in
  useEffect(() => {
    if (userData && page === 'signup') {
      setPage('success');
    }
  }, [userData, page]);

  const handleSignupSuccess = (user: User) => {
    setUserData(user);
    setPage('success');
  };

  const initiateLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setUserData(null);
    setPage('home');
    setIsLogoutModalOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header 
        currentPage={page} 
        userData={userData}
        onNavigate={setPage}
        onLogout={initiateLogout}
      />

      {page === 'home' && (
        <HomeView onSignupClick={() => setPage('signup')} />
      )}

      {page === 'signup' && !userData && (
        <SignupView 
          onSignupSuccess={handleSignupSuccess}
          onCancel={() => setPage('home')}
        />
      )}

      {page === 'success' && userData && (
        <SuccessView 
          user={userData} 
          onGoHome={() => setPage('home')}
        />
      )}
      
      {/* Fallback if on success page but no user data (e.g. refresh or manual state change) */}
      {page === 'success' && !userData && (
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
                <h2 className="text-xl font-bold mb-2">Session Expired</h2>
                <button 
                  onClick={() => setPage('home')}
                  className="text-primary-600 hover:underline"
                >
                  Return Home
                </button>
            </div>
        </div>
      )}

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
    </div>
  );
}

export default App;