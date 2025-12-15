import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Role } from '../types';
import { AISkillsPieChart } from '../components/AISkillsPieChart';
import { RoleSelector } from '../components/RoleSelector';
import './SkillsPage.css';

export const SkillsPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>('Business Analyst');

  return (
    <div className="app">
      <div className="app-container">
        <div className="page-header">
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
          <h1 className="app-title">AI Framework - Skills Visualization</h1>
        </div>
        <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
        <AISkillsPieChart selectedRole={selectedRole} />
      </div>
    </div>
  );
};
