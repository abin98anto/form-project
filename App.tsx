import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { SignupView } from './components/SignupView';
import { SuccessView } from './components/SuccessView';
import { NotFoundView } from './components/NotFoundView';
import { LogoutModal } from './components/LogoutModal';
import { User } from './types';

function App() {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleSignupSuccess = (user: User) => {
    setUserData(user);
  };

  const initiateLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setUserData(null);
    setIsLogoutModalOpen(false);
    // Usually redirect to home after logout, but if we are already there or elsewhere
    // window.location.href = '/' or use navigate hook if component was inside router
    // Since App is top level, we can't use useNavigate here easily without a wrapper.
    // However, the modal will close and the Header will update. 
    // If the user was on a protected route, they would see the fallback.
    // For now, let's just clear state.
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header 
          userData={userData}
          onLogout={initiateLogout}
        />

        <Routes>
          <Route path="/" element={<HomeView />} />
          
          <Route 
            path="/signup" 
            element={
              userData ? <Navigate to="/success" replace /> : <SignupView onSignupSuccess={handleSignupSuccess} />
            } 
          />
          
          <Route 
            path="/success" 
            element={
              userData ? (
                <SuccessView user={userData} />
              ) : (
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="text-center">
                      <h2 className="text-xl font-bold mb-2">Session Expired</h2>
                      <p className="mb-4 text-slate-600">Please sign up or log in again.</p>
                      <a href="#/" className="text-primary-600 hover:underline">Return Home</a>
                  </div>
                </div>
              )
            } 
          />

          <Route path="*" element={<NotFoundView />} />
        </Routes>

        <LogoutModal 
          isOpen={isLogoutModalOpen}
          onClose={cancelLogout}
          onConfirm={confirmLogout}
        />
      </div>
    </HashRouter>
  );
}

export default App;