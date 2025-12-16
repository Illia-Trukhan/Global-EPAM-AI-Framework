import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SkillsPage } from './pages/SkillsPage';
import { Additional } from './pages/Additional';
import { AIUpskillWorkflow } from './pages/AIUpskillWorkflow';
import { OrganizationalStructure } from './pages/OrganizationalStructure';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/additional" element={<Additional />} />
        <Route path="/ai-upskill-workflow" element={<AIUpskillWorkflow />} />
        <Route path="/organizational-structure" element={<OrganizationalStructure />} />
      </Routes>
    </Router>
  );
}

export default App;
