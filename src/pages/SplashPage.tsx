import React from 'react';
import { BookOpen } from 'lucide-react';

const SplashPage: React.FC = () => {
  return (
    <div className="splash-page">
      <div className="splash-content">
        <div className="logo-container">
          <BookOpen size={80} className="logo-icon" />
          <h1 className="logo-text">Feira Cotemig</h1>
          <p className="logo-subtitle">Sistema de Troca</p>
        </div>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default SplashPage;