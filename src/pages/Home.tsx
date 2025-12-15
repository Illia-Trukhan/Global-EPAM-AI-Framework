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
            {/* Blue boxes stacked vertically */}
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
            
            {/* Arrow from blue boxes to central statement */}
            <svg className="arrow-left-to-center" viewBox="0 0 300 400" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead-left-blue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#4A90E2" />
                </marker>
              </defs>
              <path d="M 50 0 Q 150 150, 250 400" stroke="#4A90E2" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-left-blue)" />
            </svg>
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
            
            {/* Arrow from right group to central statement */}
            <svg className="arrow-right-to-center" viewBox="0 0 300 400" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead-right-orange" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#FF8C42" />
                </marker>
              </defs>
              <path d="M 250 0 Q 150 150, 50 400" stroke="#FF8C42" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-right-orange)" />
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
            
            {/* Arrow from purple boxes to central statement */}
            <svg className="arrow-purple-to-center" viewBox="0 0 300 400" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead-purple" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#9B59B6" />
                </marker>
              </defs>
              <path d="M 50 400 Q 150 250, 250 0" stroke="#9B59B6" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-purple)" />
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
            
            {/* Arrow from white boxes to central statement */}
            <svg className="arrow-white-to-center" viewBox="0 0 300 400" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead-white" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#ffffff" />
                </marker>
              </defs>
              <path d="M 250 400 Q 150 250, 50 0" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-white)" />
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

        {/* Navigation Link */}
        <div className="home-navigation">
          <Link to="/skills" className="nav-link">
            View AI Skills by Role →
          </Link>
        </div>
      </div>
    </div>
  );
};
