import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './UpskillProcessPieChart.css';

type Role = 'Contributor' | 'Team Manager';

interface ProcessStep {
  name: string;
  role: Role;
  description: string;
  phase: string;
  stepNumber: number; // Step number in sequence
  connectsTo?: string[]; // Names of steps this connects to
}

const ROLE_COLORS = {
  'Contributor': '#4A90E2',
  'Team Manager': '#FFC107',
};

// Process steps with descriptions and step numbers - matching RadialFlowDiagram order
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

// Helper function to adjust color brightness
function adjustColorBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Component to draw arrow overlay between two pie chart segments
interface ContributorArrowOverlayProps {
  data: Array<{ name: string; value: number; step: ProcessStep }>;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fromIndex: number;
  toIndex: number;
}

// Component to draw arrow from outer ring (Contributor) to middle ring (Team Manager)
interface CrossRingArrowOverlayProps {
  fromData: Array<{ name: string; value: number; step: ProcessStep }>;
  toData: Array<{ name: string; value: number; step: ProcessStep }>;
  fromInnerRadius: number;
  fromOuterRadius: number;
  toInnerRadius: number;
  toOuterRadius: number;
  startAngle: number;
  endAngle: number;
  fromIndex: number;
  toIndex: number;
}

const ContributorArrowOverlay: React.FC<ContributorArrowOverlayProps> = ({
  data,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fromIndex,
  toIndex,
}) => {
  if (!data || data.length < 2 || fromIndex >= data.length || toIndex >= data.length) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const totalAngle = Math.abs(startAngle - endAngle); // Total angle span
  
  // Calculate cumulative angles for each segment
  let cumulativeAngle = startAngle;
  const segmentMidAngles: number[] = [];
  
  data.forEach((item) => {
    const segmentAngle = (item.value / totalValue) * totalAngle;
    const midAngle = cumulativeAngle - segmentAngle / 2; // Mid angle of segment
    segmentMidAngles.push(midAngle);
    cumulativeAngle -= segmentAngle;
  });

  // Chart center (ResponsiveContainer centers at 50%, 50% of 700px height)
  const centerX = 400; // Approximate center for ResponsiveContainer
  const centerY = 350; // Approximate center for ResponsiveContainer

  // Calculate positions based on mid angles
  const fromMidAngle = segmentMidAngles[fromIndex] * RADIAN;
  const toMidAngle = segmentMidAngles[toIndex] * RADIAN;
  
  // Start point: outer border of first segment
  const startRadius = outerRadius;
  const startX = centerX + startRadius * Math.cos(-fromMidAngle);
  const startY = centerY + startRadius * Math.sin(-fromMidAngle);
  
  // End point: outer border of second segment
  const endRadius = outerRadius;
  const endX = centerX + endRadius * Math.cos(-toMidAngle);
  const endY = centerY + endRadius * Math.sin(-toMidAngle);

  // Create a smooth curved path that follows the circular flow naturally
  const midAngle = (fromMidAngle + toMidAngle) / 2;
  const controlRadius = (startRadius + endRadius) / 2 + 15; // Gentle curve
  const controlX = centerX + controlRadius * Math.cos(-midAngle);
  const controlY = centerY + controlRadius * Math.sin(-midAngle);

  // Use a distinctive color that stands out
  const arrowColor = '#00D9FF'; // Bright cyan/blue that's distinctive
  const markerId = `arrow-contributor-${fromIndex}-${toIndex}`;
  const filterId = `arrowGlow-${fromIndex}-${toIndex}`;

  return (
    <svg
      className="arrow-overlay"
      viewBox="0 0 800 700"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon 
            points="0 0, 12 6, 0 12" 
            fill={arrowColor}
            stroke="#ffffff"
            strokeWidth="1"
            opacity="1"
          />
        </marker>
        {/* Glow effect to make arrow distinctive */}
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Smooth curved path - solid line for better visibility */}
      <path
        d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
        stroke={arrowColor}
        strokeWidth="3.5"
        fill="none"
        markerEnd={`url(#${markerId})`}
        filter={`url(#${filterId})`}
        style={{ 
          opacity: 1,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
      />
      {/* White outline for extra distinction */}
      <path
        d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
        style={{ 
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
      />
    </svg>
  );
};

const CrossRingArrowOverlay: React.FC<CrossRingArrowOverlayProps> = ({
  fromData,
  toData,
  fromInnerRadius,
  fromOuterRadius,
  toInnerRadius,
  toOuterRadius,
  startAngle,
  endAngle,
  fromIndex,
  toIndex,
}) => {
  if (!fromData || !toData || fromIndex >= fromData.length || toIndex >= toData.length) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const fromTotalValue = fromData.reduce((sum, item) => sum + item.value, 0);
  const toTotalValue = toData.reduce((sum, item) => sum + item.value, 0);
  const totalAngle = Math.abs(startAngle - endAngle);
  
  // Calculate cumulative angles for from segments
  let fromCumulativeAngle = startAngle;
  const fromSegmentMidAngles: number[] = [];
  
  fromData.forEach((item) => {
    const segmentAngle = (item.value / fromTotalValue) * totalAngle;
    const midAngle = fromCumulativeAngle - segmentAngle / 2;
    fromSegmentMidAngles.push(midAngle);
    fromCumulativeAngle -= segmentAngle;
  });

  // Calculate cumulative angles for to segments
  let toCumulativeAngle = startAngle;
  const toSegmentMidAngles: number[] = [];
  
  toData.forEach((item) => {
    const segmentAngle = (item.value / toTotalValue) * totalAngle;
    const midAngle = toCumulativeAngle - segmentAngle / 2;
    toSegmentMidAngles.push(midAngle);
    toCumulativeAngle -= segmentAngle;
  });

  // Chart center
  const centerX = 400;
  const centerY = 350;

  // Calculate positions
  const fromMidAngle = fromSegmentMidAngles[fromIndex] * RADIAN;
  const toMidAngle = toSegmentMidAngles[toIndex] * RADIAN;
  
  // Start point: outer border of contributor segment
  const startX = centerX + fromOuterRadius * Math.cos(-fromMidAngle);
  const startY = centerY + fromOuterRadius * Math.sin(-fromMidAngle);
  
  // End point: outer border of team manager segment
  const endX = centerX + toOuterRadius * Math.cos(-toMidAngle);
  const endY = centerY + toOuterRadius * Math.sin(-toMidAngle);

  // Create a smooth curved path
  const midAngle = (fromMidAngle + toMidAngle) / 2;
  const controlRadius = (fromOuterRadius + toOuterRadius) / 2;
  const controlX = centerX + controlRadius * Math.cos(-midAngle);
  const controlY = centerY + controlRadius * Math.sin(-midAngle);

  const arrowColor = '#00D9FF';
  const markerId = `arrow-cross-${fromIndex}-${toIndex}`;
  const filterId = `arrowGlow-cross-${fromIndex}-${toIndex}`;

  return (
    <svg
      className="arrow-overlay"
      viewBox="0 0 800 700"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon 
            points="0 0, 12 6, 0 12" 
            fill={arrowColor}
            stroke="#ffffff"
            strokeWidth="1"
            opacity="1"
          />
        </marker>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
        stroke={arrowColor}
        strokeWidth="3.5"
        fill="none"
        markerEnd={`url(#${markerId})`}
        filter={`url(#${filterId})`}
        style={{ 
          opacity: 1,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
      />
      <path
        d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
        style={{ 
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
      />
    </svg>
  );
};

export const UpskillProcessPieChart: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  // Combine all steps in the proper sequence on a single ring - matching RadialFlowDiagram order
  // Sequence: 1, 2, 3, 4, 5, 6, 10, 8, 9, 11
  const combinedSteps: ProcessStep[] = [
    processSteps.find(s => s.stepNumber === 1)!, // Apply to program
    processSteps.find(s => s.stepNumber === 2)!, // Complete theoretical part
    processSteps.find(s => s.stepNumber === 3)!, // Apply to Practical part
    processSteps.find(s => s.stepNumber === 4)!, // Onboard contributor
    processSteps.find(s => s.stepNumber === 5)!, // Complete ≥1 task
    processSteps.find(s => s.stepNumber === 6)!, // Send knowledge check
    processSteps.find(s => s.stepNumber === 10)!, // Pass knowledge check
    processSteps.find(s => s.stepNumber === 8)!, // Assign badge
    processSteps.find(s => s.stepNumber === 9)!, // Provide list of skills
    processSteps.find(s => s.stepNumber === 11)!, // Add skills to profile
  ].filter(Boolean); // Remove any undefined entries

  // Prepare inner circle data (Title - single segment)
  const innerData: Array<{ name: string; value: number; color: string }> = [
    {
      name: 'AI Upskill Program',
      value: 1,
      color: '#6B46C1', // Purple color for the title circle
    },
  ];

  // Prepare combined circle data (all steps in sequence)
  const combinedData: Array<{ name: string; value: number; role: Role; color: string; step: ProcessStep }> = 
    combinedSteps.map(step => ({
      name: step.name,
      value: 1,
      role: step.role,
      color: '', // Will be set based on role
      step,
    }));

  // Assign colors based on role
  const combinedDataWithColors = combinedData.map((entry) => {
    const baseColor = ROLE_COLORS[entry.role];
    // Use different shades for variety
    const colorVariations = [
      baseColor,
      adjustColorBrightness(baseColor, 15),
      adjustColorBrightness(baseColor, -15),
      adjustColorBrightness(baseColor, 25),
      adjustColorBrightness(baseColor, -25),
      adjustColorBrightness(baseColor, 10),
      adjustColorBrightness(baseColor, -10),
      adjustColorBrightness(baseColor, 20),
      adjustColorBrightness(baseColor, -20),
      adjustColorBrightness(baseColor, 5),
      adjustColorBrightness(baseColor, -5),
    ];
    const index = combinedData.indexOf(entry);
    return {
      ...entry,
      color: colorVariations[index % colorVariations.length],
      step: entry.step,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const step = data.payload.step as ProcessStep;
      const hasConnections = step?.connectsTo && step.connectsTo.length > 0;
      
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">
            <strong>Role:</strong> {data.payload.role || 'N/A'}
          </p>
          <p className="tooltip-label">
            <strong>Step:</strong> {data.name}
          </p>
          <p className="tooltip-label">
            <strong>Phase:</strong> {step?.phase || 'N/A'}
          </p>
          {hasConnections && (
            <div className="tooltip-connections">
              <p className="tooltip-label" style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '8px' }}>
                <strong>Connects to:</strong>
              </p>
              {step.connectsTo?.map((conn, idx) => (
                <p key={idx} className="tooltip-connection-item">→ {conn}</p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Handle click on pie chart segment
  const handlePieClick = (data: any) => {
    if (data && data.payload && data.payload.step) {
      setSelectedStep(data.payload.step);
      setShowModal(true);
    }
  };

  // Handle hover on pie chart segment
  const handlePieMouseEnter = (data: any) => {
    if (data && data.payload && data.payload.step) {
      setHoveredStep(data.payload.step.name);
    }
  };

  const handlePieMouseLeave = () => {
    setHoveredStep(null);
  };

  // Get connected step names for highlighting
  const getConnectedSteps = (stepName: string): string[] => {
    const step = processSteps.find(s => s.name === stepName);
    if (!step || !step.connectsTo) return [];
    
    // Also find steps that connect TO this step
    const connectsToThis = processSteps
      .filter(s => s.connectsTo && s.connectsTo.includes(stepName))
      .map(s => s.name);
    
    return [...(step.connectsTo || []), ...connectsToThis];
  };

  const connectedSteps = hoveredStep ? getConnectedSteps(hoveredStep) : [];
  
  // All steps data for connection checking
  const allStepsData = combinedDataWithColors;

  // Render inner label (Title)
  const renderInnerLabel = ({ name, cx, cy }: any) => {
    const lines = name.split(' ');
    const lineHeight = 16;
    const startY = cy - ((lines.length - 1) * lineHeight) / 2;

    return (
      <text
        x={cx}
        y={startY}
        fill="#ffffff"
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize="14"
        fontWeight="bold"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
      >
        {lines.map((line: string, index: number) => (
          <tspan
            key={index}
            x={cx}
            dy={index === 0 ? 0 : lineHeight}
          >
            {line}
          </tspan>
        ))}
      </text>
    );
  };

  return (
    <>
      <div className="upskill-pie-chart-container">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              {/* Inner ring - Title */}
              <Pie
                data={innerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderInnerLabel}
                innerRadius={0}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {innerData.map((entry, index) => (
                  <Cell key={`cell-inner-${index}`} fill={entry.color} stroke="#1a1a2e" strokeWidth={2} />
                ))}
              </Pie>
              
              {/* Combined ring - All steps in sequence */}
              <Pie
                data={combinedDataWithColors}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, cx, cy, midAngle, innerRadius, outerRadius, payload }: any) => {
                  const RADIAN = Math.PI / 180;
                  const stepNumber = payload?.step?.stepNumber;
                  
                  // Position for step number (inside the segment)
                  const numberRadius = (innerRadius + outerRadius) / 2;
                  const numberX = cx + numberRadius * Math.cos(-midAngle * RADIAN);
                  const numberY = cy + numberRadius * Math.sin(-midAngle * RADIAN);
                  
                  // Position for step name (outside the segment)
                  const labelRadius = outerRadius + 25;
                  const labelX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
                  const labelY = cy + labelRadius * Math.sin(-midAngle * RADIAN);

                  if (combinedDataWithColors.length < 50) {
                    return (
                      <g>
                        {/* Step number inside the segment */}
                        {stepNumber && (
                          <g>
                            <circle
                              cx={numberX}
                              cy={numberY}
                              r="12"
                              fill="rgba(0, 0, 0, 0.5)"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                            />
                            <text
                              x={numberX}
                              y={numberY}
                              fill="#ffffff"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontSize="11"
                              fontWeight="bold"
                              className="step-number-label"
                              style={{ 
                                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                pointerEvents: 'none'
                              }}
                            >
                              {stepNumber}
                            </text>
                          </g>
                        )}
                        {/* Step name outside the segment */}
                        <text
                          x={labelX}
                          y={labelY}
                          fill="#ffffff"
                          textAnchor={labelX > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize="9"
                          className="step-label"
                          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                        >
                          {name.length > 25 ? name.substring(0, 25) + '...' : name}
                        </text>
                      </g>
                    );
                  }
                  return null;
                }}
                innerRadius={90}
                outerRadius={240}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                onClick={handlePieClick}
                onMouseEnter={handlePieMouseEnter}
                onMouseLeave={handlePieMouseLeave}
              >
                {combinedDataWithColors.map((entry, index) => {
                  const isHovered = hoveredStep === entry.name;
                  const isConnected = connectedSteps.includes(entry.name);
                  const shouldHighlight = isHovered || isConnected;
                  
                  return (
                    <Cell
                      key={`cell-combined-${index}`}
                      fill={shouldHighlight ? adjustColorBrightness(entry.color, 30) : entry.color}
                      stroke={shouldHighlight ? '#ffffff' : '#1a1a2e'}
                      strokeWidth={shouldHighlight ? 3 : 1}
                      style={{ 
                        cursor: 'pointer',
                        opacity: hoveredStep && !shouldHighlight ? 0.3 : 1,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modal for step details */}
      {showModal && selectedStep && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <div className="modal-header">
              <h2>{selectedStep.name}</h2>
              <div className="modal-badges">
                <span className={`role-badge ${selectedStep.role === 'Contributor' ? 'contributor' : 'manager'}`}>
                  {selectedStep.role}
                </span>
                <span className="phase-badge">{selectedStep.phase}</span>
              </div>
            </div>
            <div className="modal-body">
              <p>{selectedStep.description}</p>
              {selectedStep.connectsTo && selectedStep.connectsTo.length > 0 && (
                <div className="modal-connections">
                  <h4>Connects to:</h4>
                  <ul>
                    {selectedStep.connectsTo.map((connectedStep, idx) => (
                      <li key={idx}>{connectedStep}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
