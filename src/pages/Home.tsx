import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        {/* Title at top left */}
        <h1 className="home-title">AI Adoption in Locations</h1>
        
        {/* Main Framework Diagram */}
        <div className="framework-diagram">
          {/* Central Statement - Center of everything */}
          <div className="central-statement">
            <span className="statement-text">
              X% of talents<sup>*</sup> with proven{' '}
              <span className="highlight-blue">"right AI skills"</span>, possibility{' '}
              <span className="highlight-orange">"to apply these skills"</span> and{' '}
              <span className="highlight-purple">"driving results through these skills"</span>, visible to EPAM
            </span>
          </div>

          {/* Top Section - Inputs/Foundations */}
          
          {/* Left Group - Blue boxes + Certification */}
          <div className="top-left-group">
            {/* Blue boxes in a row */}
            <div className="blue-boxes">
              <div className="framework-box blue-box">
                <div className="box-content">AI Role</div>
              </div>
              <div className="framework-box blue-box">
                <div className="box-content">Expectations</div>
              </div>
              <div className="framework-box blue-box">
                <div className="box-content">Education</div>
              </div>
            </div>
            
            {/* Arrow from blue boxes group to central statement border */}
            <svg className="arrow-blue-group-to-center" viewBox="0 0 600 400" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead-blue-group" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#4A90E2" />
                </marker>
              </defs>
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#4A90E2" strokeWidth="2.5" strokeDasharray="4,4" markerEnd="url(#arrowhead-blue-group)" />
            </svg>
            
            {/* Certification box - positioned to left and slightly below */}
            <div className="certification-wrapper">
              <div className="framework-box white-box certification-box">
                <div className="box-content">Certification</div>
              </div>
              {/* Arrow from Certification to central statement */}
              <svg className="arrow-cert-to-center" viewBox="0 0 400 300" preserveAspectRatio="none">
                <defs>
                  <marker id="arrowhead-cert" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#ffffff" />
                  </marker>
                </defs>
                <path d="M 0 150 Q 150 100, 300 150" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-cert)" />
              </svg>
            </div>
            
          </div>

          {/* Right Group - Orange boxes */}
          <div className="top-right-group">
            <div className="orange-boxes">
              <div className="framework-box orange-box">
                <div className="box-content">Sandboxes</div>
              </div>
              <div className="framework-box orange-box">
                <div className="box-content">PoC</div>
              </div>
              <div className="framework-box orange-box">
                <div className="box-content">Clients</div>
              </div>
            </div>
            
            {/* Arrow from orange boxes group to central statement border */}
            <svg className="arrow-orange-group-to-center" viewBox="0 0 600 400" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead-orange-group" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#FF8C42" />
                </marker>
              </defs>
              <line x1="100%" y1="50%" x2="0" y2="50%" stroke="#FF8C42" strokeWidth="2.5" strokeDasharray="4,4" markerEnd="url(#arrowhead-orange-group)" />
            </svg>
          </div>

          {/* Bottom Section - Enablers/Outcomes */}
          
          {/* Left Group - Purple boxes */}
          <div className="bottom-left-group">
            <div className="purple-boxes">
              <div className="framework-box purple-box">
                <div className="box-content">Communication</div>
              </div>
              <div className="framework-box purple-box">
                <div className="box-content">Motivation</div>
              </div>
              <div className="framework-box purple-box">
                <div className="box-content">Recognition</div>
              </div>
            </div>
            
            {/* Arrow from purple boxes group to central statement border */}
            <svg className="arrow-purple-group-to-center" viewBox="0 0 400 500" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead-purple-group" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#9B59B6" />
                </marker>
              </defs>
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#9B59B6" strokeWidth="2.5" strokeDasharray="4,4" markerEnd="url(#arrowhead-purple-group)" />
            </svg>
          </div>

          {/* Right Group - White boxes */}
          <div className="bottom-right-group">
            <div className="white-boxes">
              <div className="framework-box white-box">
                <div className="box-content">Business</div>
              </div>
              <div className="framework-box white-box">
                <div className="box-content">Delivery</div>
              </div>
              <div className="framework-box white-box">
                <div className="box-content">WPM</div>
              </div>
            </div>
            
            {/* Arrow from white boxes group to central statement border */}
            <svg className="arrow-white-group-to-center" viewBox="0 0 400 500" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead-white-group" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#ffffff" />
                </marker>
              </defs>
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="4,4" markerEnd="url(#arrowhead-white-group)" />
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div className="home-footer">
          <div className="footer-left">
            <div className="epam-logo">&lt;epam&gt;</div>
            <div className="footer-note">
              Talents<sup>*</sup> - ?? First wave to be focused on Key People (?A4+)
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-text">EPAM Proprietary & Confidential.</div>
            <div className="page-number">2</div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="home-navigation">
          <Link to="/skills" className="nav-link">
            View AI Skills by Role →
          </Link>
          <Link to="/upskill-process" className="nav-link" style={{ marginLeft: '20px' }}>
            View AIST Upskill Program →
          </Link>
          <Link to="/additional" className="nav-link" style={{ marginLeft: '20px' }}>
            Additional Screen →
          </Link>
        </div>
      </div>
    </div>
  );
};
