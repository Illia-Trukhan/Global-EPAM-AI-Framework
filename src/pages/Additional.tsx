import React from 'react';
import { Link } from 'react-router-dom';
import './Additional.css';

export const Additional: React.FC = () => {
  return (
    <div className="additional-page">
      <div className="additional-container">
        <div className="back-link-container">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
        
        <h1 className="additional-title">Additional Screen</h1>
        
        <div className="additional-content">
          <p>This is a placeholder for an additional screen.</p>
          <p>You can customize this page with your desired content.</p>
        </div>
      </div>
    </div>
  );
};
