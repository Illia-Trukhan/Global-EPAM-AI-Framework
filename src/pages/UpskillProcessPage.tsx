import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UpskillProcessPieChart } from '../components/UpskillProcessPieChart';
import { RadialFlowDiagram } from '../components/RadialFlowDiagram';
import { ProcessSequence } from '../components/ProcessSequence';
import './UpskillProcessPage.css';

export const UpskillProcessPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'pie' | 'radial'>('radial');

  return (
    <div className="upskill-process-page">
      <div className="upskill-process-container">
        <h1 className="page-title">AI Upskill Program - Process Visualization</h1>
        
        <div className="back-link-container">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>

        {/* View Toggle */}
        <div className="view-toggle">
          <button
            className={`toggle-button ${viewMode === 'pie' ? 'active' : ''}`}
            onClick={() => setViewMode('pie')}
          >
            Pie Chart View
          </button>
          <button
            className={`toggle-button ${viewMode === 'radial' ? 'active' : ''}`}
            onClick={() => setViewMode('radial')}
          >
            Radial Flow Diagram
          </button>
        </div>

        {viewMode === 'pie' && (
          <>
            <div className="page-description">
              <p>This interactive pie chart visualizes the AI Upskill Program process flow:</p>
              <ul>
                <li><strong>Inner Ring:</strong> Shows the program title</li>
                <li><strong>Outer Ring:</strong> Displays all process steps in sequence</li>
                <li><strong>Interactivity:</strong> 
                  <ul style={{ marginTop: '5px', marginLeft: '20px' }}>
                    <li>Hover over any step to see connected steps highlighted</li>
                    <li>Click on any step to view detailed information and connections</li>
                  </ul>
                </li>
              </ul>
            </div>
            <UpskillProcessPieChart />
          </>
        )}

        {viewMode === 'radial' && (
          <>
            <div className="page-description">
              <p>This radial flow diagram shows the AI Upskill Program process flow in a circular layout:</p>
              <ul>
                <li><strong>Circular Layout:</strong> Steps are arranged in a circle around the center</li>
                <li><strong>Connections:</strong> Arrows show the flow between connected steps</li>
                <li><strong>Color Coding:</strong> Blue for Contributor steps, Yellow for Team Manager steps</li>
                <li><strong>Interactivity:</strong> 
                  <ul style={{ marginTop: '5px', marginLeft: '20px' }}>
                    <li>Hover over any node to see connected steps highlighted</li>
                    <li>Click on any node to view detailed information</li>
                    <li>Connections are highlighted when hovering over related steps</li>
                  </ul>
                </li>
              </ul>
            </div>
            <RadialFlowDiagram />
          </>
        )}

        <ProcessSequence />

        <div className="steps-summary">
          <div className="summary-section">
            <h3>Contributor Steps (7 steps)</h3>
            <ul>
              <li>Apply to program</li>
              <li>Complete theoretical part</li>
              <li>Skip Practical Part (optional)</li>
              <li>Apply to Practical part (optional)</li>
              <li>Complete ≥1 task</li>
              <li>Pass knowledge check</li>
              <li>Add gained skills to Telescope profile</li>
            </ul>
          </div>
          <div className="summary-section">
            <h3>Team Manager Steps (4 steps)</h3>
            <ul>
              <li>Onboard contributor to Dev Team and assign a task</li>
              <li>Send knowledge check</li>
              <li>Assign AI UpSkill Program Badge</li>
              <li>Provide list of gained skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
