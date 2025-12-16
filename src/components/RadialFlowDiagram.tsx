import React, { useState } from 'react';
import './RadialFlowDiagram.css';

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

// Process steps data
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
    description: 'Contributor completes the self-paced theoretical learning component.',
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
    stepNumber: 11
  },
];

interface Node {
  id: string;
  step: ProcessStep;
  angle: number;
  x: number;
  y: number;
}

export const RadialFlowDiagram: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [tooltipKey, setTooltipKey] = useState(0);

  // Calculate node positions in a circle - enlarged to fill whole area
  const centerX = 500;
  const centerY = 450;
  const radius = 280; // Increased radius to use more space
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
  const getArrowPath = (fromNode: Node, toNode: Node): string => {
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
    
    // Create a curved path
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
  const connections: Array<{ from: Node; to: Node; path: string }> = [];
  nodes.forEach(fromNode => {
    if (fromNode.step.connectsTo) {
      fromNode.step.connectsTo.forEach(connectedStepName => {
        const toNode = nodes.find(n => n.step.name === connectedStepName);
        if (toNode) {
          const path = getArrowPath(fromNode, toNode);
          connections.push({ from: fromNode, to: toNode, path });
        }
      });
    }
  });

  const handleNodeClick = (step: ProcessStep, node: Node, event: React.MouseEvent<SVGCircleElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    // If clicking the same node, just return (no need to update)
    if (selectedStep?.name === step.name && showModal) {
      return;
    }
    
    // Get the wrapper element to calculate center position
    const wrapper = document.querySelector('.radial-flow-wrapper');
    if (!wrapper) {
      return;
    }
    
    // Get the wrapper's bounding rectangle
    const wrapperRect = wrapper.getBoundingClientRect();
    
    // Calculate center position of the wrapper (diagram center)
    const screenX = wrapperRect.left + wrapperRect.width / 2;
    const screenY = wrapperRect.top + wrapperRect.height / 2;
    
    // If tooltip is already showing, update position smoothly
    if (showModal && tooltipPosition) {
      setTooltipPosition({ x: screenX, y: screenY });
      setSelectedStep(step);
      // Increment key to trigger content fade
      setTooltipKey(prev => prev + 1);
    } else {
      // First time showing tooltip
      setSelectedStep(step);
      setTooltipPosition({ x: screenX, y: screenY });
      setShowModal(true);
      setTooltipKey(0);
    }
  };

  const handleNodeHover = (stepName: string | null) => {
    setHoveredStep(stepName);
  };

  return (
    <>
      <div className="radial-flow-container">
        <div className="radial-flow-header">
          <h2>AI Upskill Program - Radial Flow Diagram</h2>
          <p className="radial-subtitle">Interactive circular flow visualization</p>
        </div>

        <div className="radial-flow-wrapper" style={{ position: 'relative' }}>
          <svg
            className="radial-flow-svg"
            viewBox="0 0 1000 900"
            preserveAspectRatio="xMidYMid meet"
            onMouseDown={(e) => e.stopPropagation()}
            onDragStart={(e) => e.preventDefault()}
          >
            <defs>
              {/* Arrow marker */}
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#00D9FF" />
              </marker>
              {/* Glow filter for arrows */}
              <filter id="arrowGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Draw connections/arrows */}
            {connections.map((conn, idx) => {
              const isHighlighted = 
                hoveredStep === conn.from.step.name || 
                hoveredStep === conn.to.step.name ||
                connectedSteps.includes(conn.from.step.name) ||
                connectedSteps.includes(conn.to.step.name);
              
              return (
                <path
                  key={`connection-${idx}`}
                  d={conn.path}
                  stroke={isHighlighted ? "#00D9FF" : "#666"}
                  strokeWidth={isHighlighted ? 3 : 2}
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  filter={isHighlighted ? "url(#arrowGlow)" : "none"}
                  opacity={hoveredStep && !isHighlighted ? 0.2 : 0.8}
                  className="connection-path"
                  style={{ pointerEvents: 'none' }}
                />
              );
            })}

            {/* Draw nodes */}
            {nodes.map((node, nodeIndex) => {
              const nodeColor = ROLE_COLORS[node.step.role];
              const isFirstNode = nodeIndex === 0;
              const isStep6 = node.step.stepNumber === 6;
              const isHovered = hoveredStep === node.step.name;
              const isConnected = connectedSteps.includes(node.step.name);
              const shouldHighlight = isHovered || isConnected;

              return (
                <g key={node.id}>
                  {/* Node circle - clickable */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={nodeRadius}
                    fill={shouldHighlight ? adjustColorBrightness(nodeColor, 30) : nodeColor}
                    stroke={shouldHighlight ? "#ffffff" : "#1a1a2e"}
                    strokeWidth={shouldHighlight ? 3 : 2}
                    className="flow-node"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleNodeClick(node.step, node, e);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onMouseEnter={() => handleNodeHover(node.step.name)}
                    onMouseLeave={() => handleNodeHover(null)}
                    style={{
                      cursor: 'pointer',
                      opacity: hoveredStep && !shouldHighlight ? 0.3 : 1,
                      transition: hoveredStep ? 'opacity 0.3s ease' : 'none',
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
                    fontSize="12"
                    fontWeight="bold"
                    className="node-number"
                    style={{ pointerEvents: 'none', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                  >
                    {node.step.stepNumber}
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
                        <g className="node-label-group">
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
                              className="node-label"
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
                        <g className="node-label-group">
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
                              className="node-label"
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
                        <g className="node-label-group">
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
                              className="node-label"
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

            {/* Center title - clickable */}
            <g
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            >
              <circle
                cx={centerX}
                cy={centerY}
                r={80}
                fill="transparent"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const svg = e.currentTarget.ownerSVGElement;
                  if (!svg) return;
                  const svgRect = svg.getBoundingClientRect();
                  const viewBox = svg.viewBox.baseVal;
                  const scaleX = svgRect.width / viewBox.width;
                  const scaleY = svgRect.height / viewBox.height;
                  const screenX = svgRect.left + (centerX * scaleX);
                  const screenY = svgRect.top + (centerY * scaleY);
                  
                  setSelectedStep({
                    name: 'AI Upskill Program',
                    role: 'Contributor',
                    description: 'The AI Upskill Program is a comprehensive learning journey designed to enhance AI capabilities across different roles. It consists of theoretical learning, practical application, and skill validation phases. Contributors progress through various stages including program application, theoretical completion, practical tasks, knowledge checks, and skill documentation.',
                    phase: 'Program Overview',
                    stepNumber: 0
                  });
                  setTooltipPosition({ x: screenX, y: screenY });
                  setShowModal(true);
                  setTooltipKey(prev => prev + 1);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                style={{ pointerEvents: 'auto' }}
              />
              <text
                x={centerX}
                y={centerY}
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="18"
                fontWeight="bold"
                className="center-title"
                style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  pointerEvents: 'none'
                }}
              >
                AI Upskill Program
              </text>
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div className="radial-legend">
          <div className="legend-item">
            <div className="legend-color contributor-legend"></div>
            <span>Contributor</span>
          </div>
          <div className="legend-item">
            <div className="legend-color manager-legend"></div>
            <span>Team Manager</span>
          </div>
        </div>
      </div>

      {/* Tooltip for step description */}
      {showModal && selectedStep && tooltipPosition && (
        <>
          {/* Backdrop to close tooltip */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'transparent',
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setShowModal(false);
              setTooltipPosition(null);
              setSelectedStep(null);
            }}
          />
          <div 
            className="radial-tooltip"
            style={{
              position: 'fixed',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div 
              key={tooltipKey}
              className="radial-tooltip-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="radial-tooltip-header">
                <h3>{selectedStep.name}</h3>
                <button 
                  className="radial-tooltip-close" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowModal(false);
                    setTooltipPosition(null);
                    setSelectedStep(null);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="radial-tooltip-badges">
                <span className={`role-badge ${selectedStep.role.toLowerCase().replace(' ', '-')}`}>
                  {selectedStep.role}
                </span>
                <span className="phase-badge">{selectedStep.phase}</span>
              </div>
              <div className="radial-tooltip-body">
                <p><strong>Description:</strong> {selectedStep.description}</p>
                <p><strong>Step Number:</strong> {selectedStep.stepNumber}</p>
                {selectedStep.connectsTo && selectedStep.connectsTo.length > 0 && (
                  <div className="radial-tooltip-connections">
                    <strong>Connects to:</strong>
                    <ul>
                      {selectedStep.connectsTo.map((conn, idx) => (
                        <li key={idx}>{conn}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
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

