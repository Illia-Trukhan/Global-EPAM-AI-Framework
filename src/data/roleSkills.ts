import { RoleSkills, Skill } from '../types';

// Business Analyst Skills
const businessAnalystSkills: Skill[] = [
  // AI Fundamentals
  { name: 'Prompt Engineering', area: 'AI Fundamentals' },
  { name: 'LLM', area: 'AI Fundamentals' },
  { name: 'API', area: 'AI Fundamentals' },
  { name: 'LangChain for GenAI/LLM Apps', area: 'AI Fundamentals' },
  { name: 'RAG', area: 'AI Fundamentals' },
  { name: 'Vector DB', area: 'AI Fundamentals' },
  { name: 'AI Ethics', area: 'AI Fundamentals' },
  { name: 'Specialization', area: 'AI Fundamentals' },
  { name: 'MCP', area: 'AI Fundamentals' },
  { name: 'SDK', area: 'AI Fundamentals' },
  { name: 'AI Chat Bot', area: 'AI Fundamentals' },
  { name: 'Plugin', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'System Prompts', area: 'AI-Driven SDLC' },
  { name: 'AI Assistant Creation/Integration', area: 'AI-Driven SDLC' },
  { name: 'AI Workflow Agent to Agent', area: 'AI-Driven SDLC' },
  { name: 'Performance measurements for dif roles', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'AI Hypothesis Testing', area: 'AI-Driven Software Solution' },
  { name: 'AI Vibecoding for POC', area: 'AI-Driven Software Solution' },
  { name: 'AI solution applicability', area: 'AI-Driven Software Solution' },
  { name: 'AI Model Capability Assessment', area: 'AI-Driven Software Solution' },
  { name: 'AI Data Assessment & Preparation', area: 'AI-Driven Software Solution' },
  { name: 'AI Solution of System Design', area: 'AI-Driven Software Solution' },
  { name: 'AI Development & Deployment', area: 'AI-Driven Software Solution' },
  { name: 'AI Solution Evaluation & Validation', area: 'AI-Driven Software Solution' },
  { name: 'AI Monitoring & Improvements', area: 'AI-Driven Software Solution' },
  { name: 'AI User Training & Change Management', area: 'AI-Driven Software Solution' },
];

// Developer Skills (different from BA)
const developerSkills: Skill[] = [
  // AI Fundamentals
  { name: 'Prompt Engineering', area: 'AI Fundamentals' },
  { name: 'LLM Integration', area: 'AI Fundamentals' },
  { name: 'API Development', area: 'AI Fundamentals' },
  { name: 'LangChain Implementation', area: 'AI Fundamentals' },
  { name: 'RAG Architecture', area: 'AI Fundamentals' },
  { name: 'Vector DB Setup', area: 'AI Fundamentals' },
  { name: 'AI Ethics in Code', area: 'AI Fundamentals' },
  { name: 'Model Specialization', area: 'AI Fundamentals' },
  { name: 'MCP Integration', area: 'AI Fundamentals' },
  { name: 'SDK Usage', area: 'AI Fundamentals' },
  { name: 'Chat Bot Development', area: 'AI Fundamentals' },
  { name: 'Plugin Development', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'System Prompt Design', area: 'AI-Driven SDLC' },
  { name: 'AI Assistant Development', area: 'AI-Driven SDLC' },
  { name: 'Agent Workflow Implementation', area: 'AI-Driven SDLC' },
  { name: 'Code Performance Metrics', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'AI Feature Testing', area: 'AI-Driven Software Solution' },
  { name: 'POC Development', area: 'AI-Driven Software Solution' },
  { name: 'Solution Architecture', area: 'AI-Driven Software Solution' },
  { name: 'Model Evaluation', area: 'AI-Driven Software Solution' },
  { name: 'Data Pipeline Setup', area: 'AI-Driven Software Solution' },
  { name: 'System Design with AI', area: 'AI-Driven Software Solution' },
  { name: 'AI Feature Deployment', area: 'AI-Driven Software Solution' },
  { name: 'Solution Testing', area: 'AI-Driven Software Solution' },
  { name: 'Performance Monitoring', area: 'AI-Driven Software Solution' },
  { name: 'Technical Documentation', area: 'AI-Driven Software Solution' },
];

// Architects Skills
const architectsSkills: Skill[] = [
  // AI Fundamentals
  { name: 'AI Architecture Patterns', area: 'AI Fundamentals' },
  { name: 'LLM Architecture', area: 'AI Fundamentals' },
  { name: 'API Architecture', area: 'AI Fundamentals' },
  { name: 'LangChain Architecture', area: 'AI Fundamentals' },
  { name: 'RAG System Design', area: 'AI Fundamentals' },
  { name: 'Vector DB Architecture', area: 'AI Fundamentals' },
  { name: 'Ethical AI Design', area: 'AI Fundamentals' },
  { name: 'Model Selection', area: 'AI Fundamentals' },
  { name: 'MCP Architecture', area: 'AI Fundamentals' },
  { name: 'SDK Architecture', area: 'AI Fundamentals' },
  { name: 'Chat Bot Architecture', area: 'AI Fundamentals' },
  { name: 'Plugin Architecture', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'System Architecture Design', area: 'AI-Driven SDLC' },
  { name: 'AI System Integration', area: 'AI-Driven SDLC' },
  { name: 'Multi-Agent Architecture', area: 'AI-Driven SDLC' },
  { name: 'Architecture Performance', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'Solution Architecture', area: 'AI-Driven Software Solution' },
  { name: 'POC Architecture', area: 'AI-Driven Software Solution' },
  { name: 'Scalability Design', area: 'AI-Driven Software Solution' },
  { name: 'Model Architecture', area: 'AI-Driven Software Solution' },
  { name: 'Data Architecture', area: 'AI-Driven Software Solution' },
  { name: 'System Architecture', area: 'AI-Driven Software Solution' },
  { name: 'Deployment Architecture', area: 'AI-Driven Software Solution' },
  { name: 'Architecture Validation', area: 'AI-Driven Software Solution' },
  { name: 'Monitoring Architecture', area: 'AI-Driven Software Solution' },
  { name: 'Change Management Design', area: 'AI-Driven Software Solution' },
];

// Designers Skills
const designersSkills: Skill[] = [
  // AI Fundamentals
  { name: 'AI UX Design', area: 'AI Fundamentals' },
  { name: 'LLM UX Patterns', area: 'AI Fundamentals' },
  { name: 'API UX Design', area: 'AI Fundamentals' },
  { name: 'GenAI UX Design', area: 'AI Fundamentals' },
  { name: 'RAG UX Design', area: 'AI Fundamentals' },
  { name: 'Vector DB UX', area: 'AI Fundamentals' },
  { name: 'Ethical Design', area: 'AI Fundamentals' },
  { name: 'AI Specialization UX', area: 'AI Fundamentals' },
  { name: 'MCP UX Design', area: 'AI Fundamentals' },
  { name: 'SDK UX Design', area: 'AI Fundamentals' },
  { name: 'Chat Bot UX', area: 'AI Fundamentals' },
  { name: 'Plugin UX Design', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'Design System Prompts', area: 'AI-Driven SDLC' },
  { name: 'AI Assistant UX', area: 'AI-Driven SDLC' },
  { name: 'Workflow UX Design', area: 'AI-Driven SDLC' },
  { name: 'Design Performance', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'AI Feature Design', area: 'AI-Driven Software Solution' },
  { name: 'POC Design', area: 'AI-Driven Software Solution' },
  { name: 'Solution UX Design', area: 'AI-Driven Software Solution' },
  { name: 'Model UX Design', area: 'AI-Driven Software Solution' },
  { name: 'Data Visualization', area: 'AI-Driven Software Solution' },
  { name: 'System Design UX', area: 'AI-Driven Software Solution' },
  { name: 'Deployment UX', area: 'AI-Driven Software Solution' },
  { name: 'Design Validation', area: 'AI-Driven Software Solution' },
  { name: 'UX Monitoring', area: 'AI-Driven Software Solution' },
  { name: 'User Training Design', area: 'AI-Driven Software Solution' },
];

// DevOps Skills
const devOpsSkills: Skill[] = [
  // AI Fundamentals
  { name: 'Prompt CI/CD', area: 'AI Fundamentals' },
  { name: 'LLM Deployment', area: 'AI Fundamentals' },
  { name: 'API Infrastructure', area: 'AI Fundamentals' },
  { name: 'LangChain DevOps', area: 'AI Fundamentals' },
  { name: 'RAG Infrastructure', area: 'AI Fundamentals' },
  { name: 'Vector DB Ops', area: 'AI Fundamentals' },
  { name: 'AI Security', area: 'AI Fundamentals' },
  { name: 'Model Ops', area: 'AI Fundamentals' },
  { name: 'MCP Infrastructure', area: 'AI Fundamentals' },
  { name: 'SDK Deployment', area: 'AI Fundamentals' },
  { name: 'Chat Bot Ops', area: 'AI Fundamentals' },
  { name: 'Plugin Deployment', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'System Automation', area: 'AI-Driven SDLC' },
  { name: 'AI Assistant Ops', area: 'AI-Driven SDLC' },
  { name: 'Workflow Automation', area: 'AI-Driven SDLC' },
  { name: 'Infrastructure Metrics', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'AI Testing Automation', area: 'AI-Driven Software Solution' },
  { name: 'POC Deployment', area: 'AI-Driven Software Solution' },
  { name: 'Solution Infrastructure', area: 'AI-Driven Software Solution' },
  { name: 'Model Deployment', area: 'AI-Driven Software Solution' },
  { name: 'Data Pipeline Ops', area: 'AI-Driven Software Solution' },
  { name: 'Infrastructure Design', area: 'AI-Driven Software Solution' },
  { name: 'CI/CD Pipeline', area: 'AI-Driven Software Solution' },
  { name: 'Infrastructure Validation', area: 'AI-Driven Software Solution' },
  { name: 'System Monitoring', area: 'AI-Driven Software Solution' },
  { name: 'Change Management Ops', area: 'AI-Driven Software Solution' },
];

// Product Managers Skills
const productManagersSkills: Skill[] = [
  // AI Fundamentals
  { name: 'AI Product Strategy', area: 'AI Fundamentals' },
  { name: 'LLM Product Planning', area: 'AI Fundamentals' },
  { name: 'API Product Management', area: 'AI Fundamentals' },
  { name: 'GenAI Product Roadmap', area: 'AI Fundamentals' },
  { name: 'RAG Product Strategy', area: 'AI Fundamentals' },
  { name: 'Vector DB Product', area: 'AI Fundamentals' },
  { name: 'Ethical Product Design', area: 'AI Fundamentals' },
  { name: 'Product Specialization', area: 'AI Fundamentals' },
  { name: 'MCP Product Strategy', area: 'AI Fundamentals' },
  { name: 'SDK Product Management', area: 'AI Fundamentals' },
  { name: 'Chat Bot Product', area: 'AI Fundamentals' },
  { name: 'Plugin Product Strategy', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'Product Requirements', area: 'AI-Driven SDLC' },
  { name: 'AI Feature Planning', area: 'AI-Driven SDLC' },
  { name: 'Workflow Product Design', area: 'AI-Driven SDLC' },
  { name: 'Product Metrics', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'Product Testing Strategy', area: 'AI-Driven Software Solution' },
  { name: 'POC Product Planning', area: 'AI-Driven Software Solution' },
  { name: 'Solution Product Strategy', area: 'AI-Driven Software Solution' },
  { name: 'Model Product Planning', area: 'AI-Driven Software Solution' },
  { name: 'Data Product Strategy', area: 'AI-Driven Software Solution' },
  { name: 'Product System Design', area: 'AI-Driven Software Solution' },
  { name: 'Product Launch', area: 'AI-Driven Software Solution' },
  { name: 'Product Validation', area: 'AI-Driven Software Solution' },
  { name: 'Product Analytics', area: 'AI-Driven Software Solution' },
  { name: 'Product Change Management', area: 'AI-Driven Software Solution' },
];

// Project/Delivery Managers Skills
const projectDeliveryManagersSkills: Skill[] = [
  // AI Fundamentals
  { name: 'AI Project Planning', area: 'AI Fundamentals' },
  { name: 'LLM Project Management', area: 'AI Fundamentals' },
  { name: 'API Project Delivery', area: 'AI Fundamentals' },
  { name: 'GenAI Project Management', area: 'AI Fundamentals' },
  { name: 'RAG Project Planning', area: 'AI Fundamentals' },
  { name: 'Vector DB Projects', area: 'AI Fundamentals' },
  { name: 'Ethical Project Management', area: 'AI Fundamentals' },
  { name: 'Project Specialization', area: 'AI Fundamentals' },
  { name: 'MCP Project Management', area: 'AI Fundamentals' },
  { name: 'SDK Project Delivery', area: 'AI Fundamentals' },
  { name: 'Chat Bot Projects', area: 'AI Fundamentals' },
  { name: 'Plugin Project Management', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'Project Requirements', area: 'AI-Driven SDLC' },
  { name: 'AI Project Delivery', area: 'AI-Driven SDLC' },
  { name: 'Workflow Project Management', area: 'AI-Driven SDLC' },
  { name: 'Project Metrics', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'Project Testing', area: 'AI-Driven Software Solution' },
  { name: 'POC Project Management', area: 'AI-Driven Software Solution' },
  { name: 'Solution Delivery', area: 'AI-Driven Software Solution' },
  { name: 'Model Project Planning', area: 'AI-Driven Software Solution' },
  { name: 'Data Project Management', area: 'AI-Driven Software Solution' },
  { name: 'Project System Design', area: 'AI-Driven Software Solution' },
  { name: 'Project Deployment', area: 'AI-Driven Software Solution' },
  { name: 'Project Validation', area: 'AI-Driven Software Solution' },
  { name: 'Project Monitoring', area: 'AI-Driven Software Solution' },
  { name: 'Change Management', area: 'AI-Driven Software Solution' },
];

// QA & Test Automation Skills
const qaTestAutomationSkills: Skill[] = [
  // AI Fundamentals
  { name: 'AI Testing Fundamentals', area: 'AI Fundamentals' },
  { name: 'LLM Testing', area: 'AI Fundamentals' },
  { name: 'API Testing', area: 'AI Fundamentals' },
  { name: 'GenAI Testing', area: 'AI Fundamentals' },
  { name: 'RAG Testing', area: 'AI Fundamentals' },
  { name: 'Vector DB Testing', area: 'AI Fundamentals' },
  { name: 'Ethical Testing', area: 'AI Fundamentals' },
  { name: 'Model Testing', area: 'AI Fundamentals' },
  { name: 'MCP Testing', area: 'AI Fundamentals' },
  { name: 'SDK Testing', area: 'AI Fundamentals' },
  { name: 'Chat Bot Testing', area: 'AI Fundamentals' },
  { name: 'Plugin Testing', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'System Test Design', area: 'AI-Driven SDLC' },
  { name: 'AI Assistant Testing', area: 'AI-Driven SDLC' },
  { name: 'Workflow Testing', area: 'AI-Driven SDLC' },
  { name: 'Test Performance', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'AI Test Strategy', area: 'AI-Driven Software Solution' },
  { name: 'POC Testing', area: 'AI-Driven Software Solution' },
  { name: 'Solution Testing', area: 'AI-Driven Software Solution' },
  { name: 'Model Validation', area: 'AI-Driven Software Solution' },
  { name: 'Data Testing', area: 'AI-Driven Software Solution' },
  { name: 'System Test Design', area: 'AI-Driven Software Solution' },
  { name: 'Deployment Testing', area: 'AI-Driven Software Solution' },
  { name: 'Solution Validation', area: 'AI-Driven Software Solution' },
  { name: 'Test Monitoring', area: 'AI-Driven Software Solution' },
  { name: 'Test Automation', area: 'AI-Driven Software Solution' },
];

// Other Roles Skills (generic)
const otherRolesSkills: Skill[] = [
  // AI Fundamentals
  { name: 'AI Basics', area: 'AI Fundamentals' },
  { name: 'LLM Understanding', area: 'AI Fundamentals' },
  { name: 'API Basics', area: 'AI Fundamentals' },
  { name: 'GenAI Overview', area: 'AI Fundamentals' },
  { name: 'RAG Basics', area: 'AI Fundamentals' },
  { name: 'Vector DB Basics', area: 'AI Fundamentals' },
  { name: 'AI Ethics Overview', area: 'AI Fundamentals' },
  { name: 'AI Specialization', area: 'AI Fundamentals' },
  { name: 'MCP Basics', area: 'AI Fundamentals' },
  { name: 'SDK Basics', area: 'AI Fundamentals' },
  { name: 'Chat Bot Basics', area: 'AI Fundamentals' },
  { name: 'Plugin Basics', area: 'AI Fundamentals' },
  
  // AI-Driven SDLC
  { name: 'System Understanding', area: 'AI-Driven SDLC' },
  { name: 'AI Assistant Basics', area: 'AI-Driven SDLC' },
  { name: 'Workflow Basics', area: 'AI-Driven SDLC' },
  { name: 'Performance Basics', area: 'AI-Driven SDLC' },
  
  // AI-Driven Software Solution
  { name: 'AI Solution Basics', area: 'AI-Driven Software Solution' },
  { name: 'POC Understanding', area: 'AI-Driven Software Solution' },
  { name: 'Solution Overview', area: 'AI-Driven Software Solution' },
  { name: 'Model Basics', area: 'AI-Driven Software Solution' },
  { name: 'Data Basics', area: 'AI-Driven Software Solution' },
  { name: 'System Design Basics', area: 'AI-Driven Software Solution' },
  { name: 'Development Basics', area: 'AI-Driven Software Solution' },
  { name: 'Validation Basics', area: 'AI-Driven Software Solution' },
  { name: 'Monitoring Basics', area: 'AI-Driven Software Solution' },
  { name: 'Change Management Basics', area: 'AI-Driven Software Solution' },
];

export const roleSkillsData: RoleSkills[] = [
  { role: 'Business Analyst', skills: businessAnalystSkills },
  { role: 'Developer', skills: developerSkills },
  { role: 'Architects', skills: architectsSkills },
  { role: 'Designers', skills: designersSkills },
  { role: 'DevOps', skills: devOpsSkills },
  { role: 'Product Managers', skills: productManagersSkills },
  { role: 'Project/Delivery Managers', skills: projectDeliveryManagersSkills },
  { role: 'QA & Test Automation', skills: qaTestAutomationSkills },
  { role: 'Other Roles', skills: otherRolesSkills },
];
