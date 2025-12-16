import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SkillsPage } from './pages/SkillsPage';
import { UpskillProcessPage } from './pages/UpskillProcessPage';
import { Additional } from './pages/Additional';
import { AIUpskillWorkflow } from './pages/AIUpskillWorkflow';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/upskill-process" element={<UpskillProcessPage />} />
        <Route path="/additional" element={<Additional />} />
        <Route path="/ai-upskill-workflow" element={<AIUpskillWorkflow />} />
      </Routes>
    </Router>
  );
}

export default App;
