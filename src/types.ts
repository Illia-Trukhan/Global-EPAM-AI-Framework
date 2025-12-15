export type Role = 
  | 'Business Analyst'
  | 'Developer'
  | 'Architects'
  | 'Designers'
  | 'DevOps'
  | 'Product Managers'
  | 'Project/Delivery Managers'
  | 'QA & Test Automation'
  | 'Other Roles';

export type AIArea = 'AI Fundamentals' | 'AI-Driven SDLC' | 'AI-Driven Software Solution';

export interface Skill {
  name: string;
  area: AIArea;
}

export interface RoleSkills {
  role: Role;
  skills: Skill[];
}

export interface AreaData {
  name: AIArea;
  angle: number;
  skills: Skill[];
}
