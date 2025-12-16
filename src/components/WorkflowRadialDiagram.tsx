import React, { useState } from 'react';
import './WorkflowRadialDiagram.css';

type Role = 'Contributor' | 'Team Manager';

interface ProcessStep {
  name: string;
  role: Role;
  description: string;
  phase: string;
  stepNumber: number;
  connectsTo?: string[];
}

const ROLE_COLORS = {
  'Contributor': '#4A90E2',
  'Team Manager': '#FFC107',
};

// Process steps data - matching the main radial flow diagram
const processSteps: ProcessStep[] = [
  { 
    name: 'Apply to program', 
    role: 'Contributor',
    description: 'Contributor submits an application to join the AI Upskill Program.',
    phase: 'Initiation',
    stepNumber: 1,
    connectsTo: ['Complete theoretical part']
  },
  { 
    name: 'Complete theoretical part', 
    role: 'Contributor',
    description: 'Contributor completes the self-paced theoretical learning component.\nIn some cases, the practical part can be skipped.',
    phase: 'Theoretical Part (Self-paced)',
    stepNumber: 2,
    connectsTo: ['Apply to Practical part']
  },
  { 
    name: 'Apply to Practical part', 
    role: 'Contributor',
    description: 'Apply to practical part or skip it. Optional path: Contributor applies to participate in the practical part.',
    phase: 'Theoretical Part (Self-paced)',
    stepNumber: 3,
    connectsTo: ['Onboard contributor to Dev Team and assign a task']
  },
  { 
    name: 'Onboard contributor to Dev Team and assign a task', 
    role: 'Team Manager',
    description: 'Team Manager onboards the contributor to the development team and assigns practical tasks.',
    phase: 'Waiting for Project',
    stepNumber: 4,
    connectsTo: ['Complete ≥1 task']
  },
  { 
    name: 'Complete ≥1 task', 
    role: 'Contributor',
    description: 'Contributor completes at least one practical task assigned by the Team Manager.',
    phase: 'Practical Part',
    stepNumber: 5,
    connectsTo: ['Send knowledge check']
  },
  { 
    name: 'Send knowledge check', 
    role: 'Team Manager',
    description: 'Team Manager sends a knowledge check to the contributor after they complete their assigned task(s).',
    phase: 'Practical Part',
    stepNumber: 6,
    connectsTo: ['Pass knowledge check']
  },
  { 
    name: 'Pass knowledge check', 
    role: 'Contributor',
    description: 'Contributor successfully passes the knowledge check sent by the Team Manager.',
    phase: 'Practical Part',
    stepNumber: 10,
    connectsTo: ['Assign AI UpSkill Program Badge']
  },
  { 
    name: 'Assign AI UpSkill Program Badge', 
    role: 'Team Manager',
    description: 'Team Manager assigns the AI ENABLER PRACTITIONER badge to the contributor.',
    phase: 'Practical Part',
    stepNumber: 8,
    connectsTo: ['Provide list of gained skills']
  },
  { 
    name: 'Provide list of gained skills', 
    role: 'Team Manager',
    description: 'Team Manager provides a comprehensive list of skills that the contributor has gained.',
    phase: 'Practical Part',
    stepNumber: 9,
    connectsTo: ['Add gained skills to Telescope profile']
  },
  { 
    name: 'Add gained skills to Telescope profile', 
    role: 'Contributor',
    description: 'Final step: Contributor adds all the skills gained during the program to their Telescope profile.',
    phase: 'Ending',
    stepNumber: 11,
    connectsTo: ['Workflow Completed']
  },
  { 
    name: 'Workflow Completed', 
    role: 'Contributor',
    description: 'The AI Upskill Program workflow has been successfully completed. All steps have been finished and skills have been documented.',
    phase: 'Completion',
    stepNumber: 12
  },
];

interface Node {
  id: string;
  step: ProcessStep;
  angle: number;
  x: number;
  y: number;
}

export const WorkflowRadialDiagram: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  // Calculate node positions in a circle
  const centerX = 600;
  const centerY = 500;
  const radius = 280;
  const nodeRadius = 35;

  // Create nodes in sequence order
  const nodes: Node[] = processSteps.map((step, index) => {
    // Distribute nodes evenly around the circle
    const angle = (index / processSteps.length) * 2 * Math.PI - Math.PI / 2; // Start from top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    return {
      id: `node-${step.stepNumber}`,
      step,
      angle,
      x,
      y,
    };
  });

  // Get connected step names for highlighting
  const getConnectedSteps = (stepName: string): string[] => {
    const step = processSteps.find(s => s.name === stepName);
    if (!step || !step.connectsTo) return [];
    
    const connectsToThis = processSteps
      .filter(s => s.connectsTo && s.connectsTo.includes(stepName))
      .map(s => s.name);
    
    return [...(step.connectsTo || []), ...connectsToThis];
  };

  const connectedSteps = hoveredStep ? getConnectedSteps(hoveredStep) : [];

  // Calculate arrow paths between connected nodes
  const getArrowPath = (fromNode: Node, toNode: Node, isAlternativePath: boolean = false): string => {
    // Calculate direction vector
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize and scale to node edge
    const unitX = dx / distance;
    const unitY = dy / distance;
    
    // Start point at edge of from node
    const startX = fromNode.x + unitX * nodeRadius;
    const startY = fromNode.y + unitY * nodeRadius;
    
    // End point at edge of to node
    const endX = toNode.x - unitX * nodeRadius;
    const endY = toNode.y - unitY * nodeRadius;
    
    // For alternative paths (like step 2 to Workflow Completed)
    if (isAlternativePath) {
      // Inner circle radius (where descriptions are shown)
      const innerCircleRadius = 180;
      
      // Calculate start and end angles
      const startAngle = fromNode.angle;
      const endAngle = toNode.angle;
      
      // Calculate bottom points of both circles
      const startBottomAngle = startAngle + Math.PI / 2;
      const startY_bottom = fromNode.y + nodeRadius * Math.sin(startBottomAngle);
      
      const endBottomAngle = endAngle + Math.PI / 2;
      const endY_bottom = toNode.y + nodeRadius * Math.sin(endBottomAngle);
      
      // Use the same Y coordinate for both start and end points (same horizontal line)
      // Use the lower Y coordinate to ensure both points are at the bottom of their circles
      const commonY = Math.max(startY_bottom, endY_bottom);
      
      // Calculate X coordinates where the horizontal line intersects each circle at the bottom
      // For node 2: find X where (x - fromNode.x)^2 + (commonY - fromNode.y)^2 = nodeRadius^2
      // Solving: x = fromNode.x ± sqrt(nodeRadius^2 - (commonY - fromNode.y)^2)
      // We want the bottom point, so we use the X that's closer to the center or appropriate side
      const startDy = commonY - fromNode.y;
      const startDx = Math.sqrt(Math.max(0, nodeRadius * nodeRadius - startDy * startDy));
      // Use the X that's on the bottom side (typically the one closer to centerX for bottom points)
      const startX_bottom = fromNode.x; // For bottom, X is typically at the node's center X
      
      // For green node: same calculation
      const endDy = commonY - toNode.y;
      const endDx = Math.sqrt(Math.max(0, nodeRadius * nodeRadius - endDy * endDy));
      const endX_bottom = toNode.x; // For bottom, X is typically at the node's center X
      
      // Actually, for bottom points on circles, we need to find where the horizontal line intersects
      // Since we want the bottom of the circle, we need the point where the circle's bottom arc meets the horizontal line
      // For a circle centered at (cx, cy) with radius r, at y = commonY:
      // x = cx ± sqrt(r^2 - (commonY - cy)^2)
      // For bottom points, we typically want the point directly below the center
      // But if commonY is not exactly at the bottom, we need to calculate the intersection
      
      // Simpler approach: use the actual bottom points but adjust Y to be the same
      // Calculate the angle where the horizontal line at commonY intersects each circle
      const startIntersectAngle = Math.asin((commonY - fromNode.y) / nodeRadius);
      const startX_intersect = fromNode.x + nodeRadius * Math.cos(startIntersectAngle);
      
      const endIntersectAngle = Math.asin((commonY - toNode.y) / nodeRadius);
      const endX_intersect = toNode.x + nodeRadius * Math.cos(endIntersectAngle);
      
      // Use the points that are on the bottom half of each circle
      // For bottom points, we want the angle to be between 0 and Math.PI (bottom half)
      const startX_bottom_final = fromNode.x + nodeRadius * Math.cos(Math.PI - startIntersectAngle);
      const endX_bottom_final = toNode.x + nodeRadius * Math.cos(Math.PI - endIntersectAngle);
      
      // Actually, let's use a simpler approach: find the bottom-most Y of both circles, then use that
      const startBottomY = fromNode.y + nodeRadius;
      const endBottomY = toNode.y + nodeRadius;
      const commonY_final = Math.max(startBottomY, endBottomY);
      
      // For each circle, find the X coordinate at this Y level on the bottom arc
      // The bottom arc is from angle π/2 to 3π/2 (bottom half)
      // At y = commonY_final, for circle centered at (cx, cy):
      // commonY_final = cy + r * sin(angle)
      // angle = asin((commonY_final - cy) / r)
      // x = cx + r * cos(angle)
      
      const startAngle_atY = Math.asin(Math.max(-1, Math.min(1, (commonY_final - fromNode.y) / nodeRadius)));
      const startX_atY = fromNode.x + nodeRadius * Math.cos(startAngle_atY);
      
      const endAngle_atY = Math.asin(Math.max(-1, Math.min(1, (commonY_final - toNode.y) / nodeRadius)));
      const endX_atY = toNode.x + nodeRadius * Math.cos(endAngle_atY);
      
      // Find node 1 position (first node, at the top)
      const node1Angle = -Math.PI / 2;
      const node1X = centerX + radius * Math.cos(node1Angle);
      const node1Y = centerY + radius * Math.sin(node1Angle);
      
      // Calculate the top of the inner circle
      const innerCircleTopY = centerY - innerCircleRadius;
      
      // Arrow should go:
      // 1. Under node 1 (below node1Y + nodeRadius)
      // 2. Above the inner circle (above innerCircleTopY)
      const minY = Math.max(node1Y + nodeRadius + 20, innerCircleTopY - 20);
      
      // Create control points for a smooth curve
      const midX = (startX_atY + endX_atY) / 2;
      const controlY = minY;
      
      let controlX = midX;
      const node1Left = node1X - nodeRadius - 20;
      const node1Right = node1X + nodeRadius + 20;
      if (controlX >= node1Left && controlX <= node1Right) {
        controlX = controlX < centerX ? node1Left - 10 : node1Right + 10;
      }
      
      // Create path: smooth curve from bottom of node 2 to bottom of green node
      // Both start and end points are on the same horizontal line (commonY_final)
      return `M ${startX_atY} ${commonY_final} Q ${controlX} ${controlY} ${endX_atY} ${commonY_final}`;
    }
    
    // Regular path - create a curved path
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Add curve control point (perpendicular to the line)
    const perpX = -unitY * 30;
    const perpY = unitX * 30;
    const controlX = midX + perpX;
    const controlY = midY + perpY;
    
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  };

  // Get all connections
  const connections: Array<{ from: Node; to: Node; path: string; isAlternative: boolean }> = [];
  nodes.forEach(fromNode => {
    if (fromNode.step.connectsTo) {
      fromNode.step.connectsTo.forEach((connectedStepName, index) => {
        const toNode = nodes.find(n => n.step.name === connectedStepName);
        if (toNode) {
          // Check if this is an alternative path (step 2 to Workflow Completed)
          const isAlternative = fromNode.step.stepNumber === 2 && 
                               connectedStepName === 'Workflow Completed' && 
                               index > 0; // Second connection from step 2
          const path = getArrowPath(fromNode, toNode, isAlternative);
          connections.push({ from: fromNode, to: toNode, path, isAlternative });
        }
      });
    }
  });

  const handleNodeClick = (step: ProcessStep, event: React.MouseEvent<SVGCircleElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedStep(step);
  };

  const handleNodeHover = (stepName: string | null) => {
    setHoveredStep(stepName);
  };

  const handleBackgroundClick = (event: React.MouseEvent<SVGSVGElement>) => {
    // Only reset if clicking on the SVG background (not on nodes or other elements)
    if (event.target === event.currentTarget || (event.target as SVGElement).tagName === 'svg') {
      setSelectedStep(null);
    }
  };

  return (
    <div className="workflow-radial-container">
      <div className="workflow-radial-wrapper">
        <svg
          className="workflow-radial-svg"
          viewBox="0 0 1200 1000"
          preserveAspectRatio="xMidYMid meet"
          onClick={handleBackgroundClick}
        >
          <defs>
            {/* Arrow marker */}
            <marker
              id="workflow-arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#00D9FF" />
            </marker>
            {/* Glow filter for arrows */}
            <filter id="workflow-arrowGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Center description area - draw first so arrows appear on top */}
          <g>
            {/* Background circle for description - made bigger */}
            <circle
              cx={centerX}
              cy={centerY}
              r={180}
              fill="rgba(26, 26, 46, 0.95)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="2"
              style={{ pointerEvents: 'none' }}
            />
            
            {/* Description text */}
            {selectedStep ? (
              <g>
                {/* Step name - split into multiple lines if needed */}
                {(() => {
                  const maxCharsPerLine = 30;
                  const words = selectedStep.name.split(' ');
                  const lines: string[] = [];
                  let currentLine = '';
                  
                  words.forEach(word => {
                    if ((currentLine + word).length <= maxCharsPerLine) {
                      currentLine += (currentLine ? ' ' : '') + word;
                    } else {
                      if (currentLine) lines.push(currentLine);
                      currentLine = word;
                    }
                  });
                  if (currentLine) lines.push(currentLine);
                  
                  const startY = centerY - 60;
                  const lineHeight = 18;
                  
                  return lines.map((line, idx) => (
                    <text
                      key={idx}
                      x={centerX}
                      y={startY + idx * lineHeight}
                      fill="#ffffff"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="16"
                      fontWeight="bold"
                      style={{ 
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        pointerEvents: 'none'
                      }}
                    >
                      {line}
                    </text>
                  ));
                })()}
                
                {/* Role badge - positioned dynamically based on title length */}
                {(() => {
                  const titleWords = selectedStep.name.split(' ');
                  const maxCharsPerLine = 30;
                  let titleLines = 0;
                  let currentLine = '';
                  
                  titleWords.forEach(word => {
                    if ((currentLine + word).length <= maxCharsPerLine) {
                      currentLine += (currentLine ? ' ' : '') + word;
                    } else {
                      if (currentLine) titleLines++;
                      currentLine = word;
                    }
                  });
                  if (currentLine) titleLines++;
                  
                  const roleY = centerY - 60 + (titleLines * 18) + 20;
                  
                  return (
                    <text
                      x={centerX}
                      y={roleY}
                      fill={ROLE_COLORS[selectedStep.role]}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="14"
                      fontWeight="600"
                      style={{ 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        pointerEvents: 'none'
                      }}
                    >
                      {selectedStep.role}
                    </text>
                  );
                })()}
                
                {/* Phase - positioned dynamically */}
                {(() => {
                  const titleWords = selectedStep.name.split(' ');
                  const maxCharsPerLine = 30;
                  let titleLines = 0;
                  let currentLine = '';
                  
                  titleWords.forEach(word => {
                    if ((currentLine + word).length <= maxCharsPerLine) {
                      currentLine += (currentLine ? ' ' : '') + word;
                    } else {
                      if (currentLine) titleLines++;
                      currentLine = word;
                    }
                  });
                  if (currentLine) titleLines++;
                  
                  const phaseY = centerY - 60 + (titleLines * 18) + 40;
                  
                  return (
                    <text
                      x={centerX}
                      y={phaseY}
                      fill="#b0b0b0"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fontStyle="italic"
                      style={{ 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        pointerEvents: 'none'
                      }}
                    >
                      {selectedStep.phase}
                    </text>
                  );
                })()}
                
                {/* Description - split into multiple lines with dynamic positioning */}
                {(() => {
                  const titleWords = selectedStep.name.split(' ');
                  const maxCharsPerLine = 30;
                  let titleLines = 0;
                  let currentLine = '';
                  
                  titleWords.forEach(word => {
                    if ((currentLine + word).length <= maxCharsPerLine) {
                      currentLine += (currentLine ? ' ' : '') + word;
                    } else {
                      if (currentLine) titleLines++;
                      currentLine = word;
                    }
                  });
                  if (currentLine) titleLines++;
                  
                  const descStartY = centerY - 60 + (titleLines * 18) + 60;
                  const maxCharsPerDescLine = 45;
                  // Split by newlines first, then by words for each line
                  const descriptionLines: string[] = [];
                  const paragraphs = selectedStep.description.split('\n');
                  
                  paragraphs.forEach((paragraph, paraIdx) => {
                    if (paraIdx > 0) {
                      // Add empty line between paragraphs
                      descriptionLines.push('');
                    }
                    const words = paragraph.split(' ');
                    let currentLine = '';
                    
                    words.forEach(word => {
                      if ((currentLine + word).length <= maxCharsPerDescLine) {
                        currentLine += (currentLine ? ' ' : '') + word;
                      } else {
                        if (currentLine) descriptionLines.push(currentLine);
                        currentLine = word;
                      }
                    });
                    if (currentLine) descriptionLines.push(currentLine);
                  });
                  
                  const lines = descriptionLines;
                  
                  return lines.map((line, idx) => (
                    <text
                      key={idx}
                      x={centerX}
                      y={descStartY + idx * 16}
                      fill="#e0e0e0"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="12"
                      style={{ 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        pointerEvents: 'none'
                      }}
                    >
                      {line}
                    </text>
                  ));
                })()}
              </g>
            ) : (
              // Initial state - show title
              <text
                x={centerX}
                y={centerY}
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="20"
                fontWeight="bold"
                style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  pointerEvents: 'none'
                }}
              >
                AI Upskill Program
              </text>
            )}
          </g>

          {/* Draw connections/arrows - draw after center circle so they appear on top */}
          {connections.map((conn, idx) => {
            const isHighlighted = 
              selectedStep?.name === conn.from.step.name || 
              selectedStep?.name === conn.to.step.name;
            
            // Plain arrow styling for alternative paths
            const isAlternative = conn.isAlternative;
            
            return (
              <path
                key={`connection-${idx}`}
                d={conn.path}
                stroke={isAlternative ? "#666" : (isHighlighted ? "#00D9FF" : "#666")}
                strokeWidth={isAlternative ? 2 : (isHighlighted ? 3 : 2)}
                fill="none"
                markerEnd="url(#workflow-arrowhead)"
                filter={isAlternative ? "none" : (isHighlighted ? "url(#workflow-arrowGlow)" : "none")}
                opacity={isAlternative ? 0.8 : (selectedStep && !isHighlighted ? 0.2 : 0.8)}
                strokeDasharray={isAlternative ? "5,5" : "none"}
                className="workflow-connection-path"
                style={{ pointerEvents: 'none' }}
              />
            );
          })}

          {/* Draw nodes */}
          {nodes.map((node, nodeIndex) => {
            const nodeColor = ROLE_COLORS[node.step.role];
            const isFirstNode = nodeIndex === 0;
            const isStep6 = node.step.stepNumber === 6;
            const isSelected = selectedStep?.name === node.step.name;

            return (
              <g key={node.id}>
                {/* Node circle - clickable */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  fill={node.step.name === 'Workflow Completed' 
                    ? '#10B981' 
                    : (isSelected ? adjustColorBrightness(nodeColor, 50) : nodeColor)}
                  stroke={node.step.name === 'Workflow Completed'
                    ? '#10B981'
                    : (isSelected ? "#ffffff" : "#1a1a2e")}
                  strokeWidth={isSelected ? 4 : (node.step.name === 'Workflow Completed' ? 3 : 2)}
                  className="workflow-flow-node"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNodeClick(node.step, e);
                  }}
                  onMouseEnter={() => handleNodeHover(node.step.name)}
                  onMouseLeave={() => handleNodeHover(null)}
                  style={{
                    cursor: 'pointer',
                    opacity: selectedStep && !isSelected ? 0.3 : 1,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'auto',
                  }}
                />
                
                {/* Step number inside node */}
                <text
                  x={node.x}
                  y={node.y}
                  fill="#ffffff"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={node.step.name === 'Workflow Completed' ? "18" : "12"}
                  fontWeight="bold"
                  className="workflow-node-number"
                  style={{ pointerEvents: 'none', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {node.step.name === 'Workflow Completed' ? '✓' : node.step.stepNumber}
                </text>

                {/* Step name label - first node above, step 6 below, others beside */}
                {(() => {
                  // Split long names into multiple lines if needed
                  const maxCharsPerLine = 25;
                  const words = node.step.name.split(' ');
                  const lines: string[] = [];
                  let currentLine = '';
                  
                  words.forEach(word => {
                    if ((currentLine + word).length <= maxCharsPerLine) {
                      currentLine += (currentLine ? ' ' : '') + word;
                    } else {
                      if (currentLine) lines.push(currentLine);
                      currentLine = word;
                    }
                  });
                  if (currentLine) lines.push(currentLine);
                  
                  if (isFirstNode) {
                    // First node: position label above
                    const labelX = node.x;
                    const labelY = node.y - nodeRadius - 15;
                    
                    return (
                      <g className="workflow-node-label-group">
                        {lines.map((line, idx) => (
                          <text
                            key={idx}
                            x={labelX}
                            y={labelY - (lines.length - 1 - idx) * 12}
                            fill="#ffffff"
                            textAnchor="middle"
                            dominantBaseline="hanging"
                            fontSize="10"
                            fontWeight="bold"
                            className="workflow-node-label"
                            style={{ 
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                              pointerEvents: 'none',
                              opacity: 1,
                            }}
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  } else if (isStep6) {
                    // Step 6: position label below
                    const labelX = node.x;
                    const labelY = node.y + nodeRadius + 15;
                    
                    return (
                      <g className="workflow-node-label-group">
                        {lines.map((line, idx) => (
                          <text
                            key={idx}
                            x={labelX}
                            y={labelY + idx * 12}
                            fill="#ffffff"
                            textAnchor="middle"
                            dominantBaseline="hanging"
                            fontSize="10"
                            fontWeight="bold"
                            className="workflow-node-label"
                            style={{ 
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                              pointerEvents: 'none',
                              opacity: 1,
                            }}
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  } else {
                    // Other nodes: position label beside (left or right)
                    const labelOffset = nodeRadius + 15;
                    const isRightSide = node.x > centerX;
                    const labelX = isRightSide 
                      ? node.x + labelOffset 
                      : node.x - labelOffset;
                    const labelY = node.y;
                    const textAnchor = isRightSide ? 'start' : 'end';
                    
                    return (
                      <g className="workflow-node-label-group">
                        {lines.map((line, idx) => (
                          <text
                            key={idx}
                            x={labelX}
                            y={labelY + (idx - (lines.length - 1) / 2) * 12}
                            fill="#ffffff"
                            textAnchor={textAnchor}
                            dominantBaseline="middle"
                            fontSize="10"
                            fontWeight="bold"
                            className="workflow-node-label"
                            style={{ 
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                              pointerEvents: 'none',
                              opacity: 1,
                            }}
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  }
                })()}
                
              </g>
            );
          })}

        </svg>
      </div>

      {/* Legend */}
      <div className="workflow-legend">
        <div className="workflow-legend-item">
          <div className="workflow-legend-color contributor-legend"></div>
          <span>Contributor</span>
        </div>
        <div className="workflow-legend-item">
          <div className="workflow-legend-color manager-legend"></div>
          <span>Team Manager</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to adjust color brightness
function adjustColorBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

