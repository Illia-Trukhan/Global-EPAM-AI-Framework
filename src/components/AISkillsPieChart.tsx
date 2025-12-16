import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Skill, Role, AIArea } from '../types';
import { roleSkillsData } from '../data/roleSkills';
import './AISkillsPieChart.css';

interface AISkillsPieChartProps {
  selectedRole: Role;
}

const AI_AREAS: AIArea[] = ['AI Fundamentals', 'AI-Driven SDLC', 'AI-Driven Software Solution'];
const AREA_COLORS = {
  'AI Fundamentals': '#4A90E2',
  'AI-Driven SDLC': '#50C878',
  'AI-Driven Software Solution': '#FF6B6B',
};


export const AISkillsPieChart: React.FC<AISkillsPieChartProps> = ({ selectedRole }) => {
  const roleData = roleSkillsData.find(r => r.role === selectedRole);
  if (!roleData) return null;

  // Group skills by area
  const skillsByArea = roleData.skills.reduce((acc, skill) => {
    if (!acc[skill.area]) {
      acc[skill.area] = [];
    }
    acc[skill.area].push(skill);
    return acc;
  }, {} as Record<AIArea, Skill[]>);

  // Prepare inner circle data (AI Areas)
  const innerData = AI_AREAS.map(area => ({
    name: area,
    value: skillsByArea[area]?.length || 0,
    color: AREA_COLORS[area],
  }));

  // Prepare outer circle data (Skills)
  const outerData: Array<{ name: string; value: number; area: AIArea; color: string }> = [];

  AI_AREAS.forEach(area => {
    const skills = skillsByArea[area] || [];
    skills.forEach(skill => {
      outerData.push({
        name: skill.name,
        value: 1,
        area,
        color: '', // Will be set later based on area
      });
    });
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const skillName = payload[0].name;
      const isClickable = skillName === 'Prompt Engineering';
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">
            {skillName}
            {isClickable && <span className="clickable-indicator"> (Click to learn more)</span>}
          </p>
        </div>
      );
    }
    return null;
  };

  // Get color for skill based on its area
  const getSkillColor = (area: AIArea, index: number) => {
    const baseColor = AREA_COLORS[area];
    // Create variations of the base color for skills in the same area
    const variations = [
      baseColor,
      adjustColorBrightness(baseColor, 20),
      adjustColorBrightness(baseColor, -20),
      adjustColorBrightness(baseColor, 40),
      adjustColorBrightness(baseColor, -40),
    ];
    return variations[index % variations.length];
  };

  // Helper function to adjust color brightness
  const adjustColorBrightness = (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16);
    const r = (num >> 16) + percent;
    const g = (num >> 8 & 0x00FF) + percent;
    const b = (num & 0x0000FF) + percent;
    return "#" + (0x1000000 + (r < 255 ? r < 1 ? 0 : r : 255) * 0x10000 +
      (g < 255 ? g < 1 ? 0 : g : 255) * 0x100 +
      (b < 255 ? b < 1 ? 0 : b : 255)).toString(16).slice(1);
  };

  // Update outer data with area-based colors
  const outerDataWithColors = outerData.map((item, index) => {
    const areaIndex = skillsByArea[item.area]?.findIndex(s => s.name === item.name) || 0;
    return {
      ...item,
      color: getSkillColor(item.area, areaIndex),
    };
  });


  // Handle click on pie chart segment
  const handlePieClick = (data: any, index: number, e: any) => {
    if (data && data.name === 'Prompt Engineering') {
      window.open('https://learn.epam.com/catalog/detailsPage?id=c2deabdd-7bd9-45df-b62e-c6952930aba6', '_blank');
    }
  };

  return (
    <div className="pie-chart-container">
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
          {/* Inner ring - AI Areas (rendered first so it's behind outer ring) */}
          <Pie
            data={innerData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, cx, cy, midAngle, innerRadius, outerRadius }) => {
              const RADIAN = Math.PI / 180;
              const radius = (innerRadius + outerRadius) / 2;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
              // Split text into multiple lines for better visibility
              // Always split text with multiple words into lines
              const words = name.split(' ');
              const lines: string[] = [];
              
              // If there are multiple words, split them into separate lines
              if (words.length > 1) {
                // For "AI Fundamentals" or similar, put each word on its own line
                // For longer phrases like "AI-Driven Software Solution", split intelligently
                if (name === 'AI Fundamentals') {
                  lines.push('AI');
                  lines.push('Fundamentals');
                } else if (name === 'AI-Driven Software Solution') {
                  lines.push('AI-Driven');
                  lines.push('Software');
                  lines.push('Solution');
                } else if (name === 'AI-Driven SDLC') {
                  lines.push('AI-Driven');
                  lines.push('SDLC');
                } else {
                  // Generic splitting for other multi-word labels
                  words.forEach(word => {
                    if (word) lines.push(word);
                  });
                }
              } else {
                // Single word - use as is
                lines.push(name);
              }
              
              // If only one line and it's short, use single line format
              if (lines.length === 1 && lines[0].length <= 15) {
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#ffffff"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="12"
                    fontWeight="bold"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                  >
                    {name}
                  </text>
                );
              }
              
              // Multi-line text
              const lineHeight = 14;
              const startY = y - ((lines.length - 1) * lineHeight) / 2;
              
              return (
                <text
                  x={x}
                  y={startY}
                  fill="#ffffff"
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  fontSize="11"
                  fontWeight="bold"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                >
                  {lines.map((line, index) => (
                    <tspan
                      key={index}
                      x={x}
                      dy={index === 0 ? 0 : lineHeight}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              );
            }}
            innerRadius={60}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {innerData.map((entry, index) => (
              <Cell key={`cell-inner-${index}`} fill={entry.color} stroke="#1a1a2e" strokeWidth={2} />
            ))}
          </Pie>
          {/* Outer ring - Skills */}
          <Pie
            data={outerDataWithColors}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, cx, cy, midAngle, outerRadius }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 25;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
              // Only show labels if there's reasonable space
              if (outerData.length < 60) {
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#ffffff"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    fontSize="9"
                    className="skill-label"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {name.length > 20 ? name.substring(0, 20) + '...' : name}
                  </text>
                );
              }
              return null;
            }}
            innerRadius={140}
            outerRadius={220}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            onClick={handlePieClick}
          >
            {outerDataWithColors.map((entry, index) => (
              <Cell 
                key={`cell-outer-${index}`} 
                fill={entry.color} 
                stroke="#1a1a2e" 
                strokeWidth={1}
                style={{ cursor: entry.name === 'Prompt Engineering' ? 'pointer' : 'default' }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center role overlay - positioned to match pie chart center */}
        <div className="center-role-overlay">
          <div className="center-role-circle"></div>
          <div className="center-role-text-overlay">{selectedRole}</div>
        </div>
      </div>
    </div>
  );
};
