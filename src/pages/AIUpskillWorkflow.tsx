import React from 'react';
import { Link } from 'react-router-dom';
import { WorkflowRadialDiagram } from '../components/WorkflowRadialDiagram';
import './AIUpskillWorkflow.css';

export const AIUpskillWorkflow: React.FC = () => {
  return (
    <div className="ai-upskill-workflow-page">
      <div className="workflow-container">
        <h1 className="workflow-title">AI Upskill Workflow</h1>
        
        <div className="back-link-container">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>

        <div className="workflow-description">
          <p>Click on any node to view its description in the center of the diagram. Click on empty space to reset.</p>
        </div>

        <WorkflowRadialDiagram />
      </div>
    </div>
  );
};

