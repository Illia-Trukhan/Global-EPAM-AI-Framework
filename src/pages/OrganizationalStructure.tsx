import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrganizationalStructure.css';

interface RoleDescription {
  name: string;
  description: string;
}

const coreTeamRoles: RoleDescription[] = [
  {
    name: 'Head of Program',
    description: 'Oversees the entire AI Upskill Program, sets strategic direction, ensures alignment with organizational goals, and manages overall program governance and success metrics.'
  },
  {
    name: 'Program Coordinator',
    description: 'Manages day-to-day program operations, coordinates between different teams and streams, handles logistics, scheduling, and ensures smooth program delivery across all streams.'
  },
  {
    name: 'Upskill Coordinator',
    description: 'Focuses specifically on the upskilling curriculum and participant journey, manages learning materials, tracks progress, and ensures quality of educational content and delivery.'
  },
  {
    name: 'DevOps Team (x3)',
    description: 'Provides technical infrastructure support, maintains platform stability, manages deployment pipelines, monitors system performance, and ensures the technical foundation for program delivery.'
  },
  {
    name: 'Program Architect',
    description: 'Designs the overall program structure and architecture, defines technical standards, ensures scalability, and provides architectural guidance to all streams and teams.'
  }
];

const coreTeamOverview = 'A permanent coordination group responsible for program governance, delivery control, DevOps support, and architectural oversight. This team ensures consistency, quality standards, and a unified operational model across all streams.';

// Custom scale for slider - maps position (0-100) to participants (10-1000)
// Labels are evenly spaced at: 0% (10), 33.33% (100), 66.67% (500), 100% (1000)
const sliderToValue = (position: number): number => {
  // Piecewise linear interpolation to match label positions exactly
  if (position <= 0) return 10;
  if (position >= 100) return 1000;
  
  // Breakpoints: 0% -> 10, 33.33% -> 100, 66.67% -> 500, 100% -> 1000
  if (position <= 33.33) {
    // Linear between 10 and 100
    const ratio = position / 33.33;
    return Math.round(10 + (100 - 10) * ratio);
  } else if (position <= 66.67) {
    // Linear between 100 and 500
    const ratio = (position - 33.33) / (66.67 - 33.33);
    return Math.round(100 + (500 - 100) * ratio);
  } else {
    // Linear between 500 and 1000
    const ratio = (position - 66.67) / (100 - 66.67);
    return Math.round(500 + (1000 - 500) * ratio);
  }
};

const valueToSlider = (value: number): number => {
  if (value <= 10) return 0;
  if (value >= 1000) return 100;
  
  // Reverse mapping
  if (value <= 100) {
    // Between 10 and 100
    const ratio = (value - 10) / (100 - 10);
    return ratio * 33.33;
  } else if (value <= 500) {
    // Between 100 and 500
    const ratio = (value - 100) / (500 - 100);
    return 33.33 + ratio * (66.67 - 33.33);
  } else {
    // Between 500 and 1000
    const ratio = (value - 500) / (1000 - 500);
    return 66.67 + ratio * (100 - 66.67);
  }
};

// Calculate staffing based on number of participants
const calculateStaffing = (participants: number) => {
  const coreTeam = 8; // Fixed
  const menteesPerStream = 10;
  const streams = Math.ceil(participants / menteesPerStream);
  const streamManagers = streams;
  const techLeads = streams;
  const totalStaff = coreTeam + streamManagers + techLeads;
  
  return {
    participants,
    coreTeam,
    streams,
    streamManagers,
    techLeads,
    totalStaff,
    menteesPerStream
  };
};

export const OrganizationalStructure: React.FC = () => {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [showCoreTeamInfo, setShowCoreTeamInfo] = useState(false);
  const [coreTeamInfoPosition, setCoreTeamInfoPosition] = useState<{ x: number; y: number } | null>(null);
  const [participants, setParticipants] = useState<number>(100);
  const [showStaffingTable, setShowStaffingTable] = useState(false);
  const [sliderPosition, setSliderPosition] = useState<number>(valueToSlider(100));
  
  // Update slider position when participants change externally
  useEffect(() => {
    setSliderPosition(valueToSlider(participants));
  }, [participants]);
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = Number(e.target.value);
    setSliderPosition(position);
    const newValue = sliderToValue(position);
    setParticipants(newValue);
  };
  
  const staffing = calculateStaffing(participants);
  return (
    <div className="organizational-structure-page">
      <div className="org-container">
        <div className="page-header">
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
          <h1 className="page-title">Organizational Structure</h1>
        </div>

        {/* Top Section: Organizational Structure Overview */}
        <div className="overview-section">
          {/* Organizational structure (Diagram) */}
          <div className="org-diagram-compact">
            <div className="diagram-header-compact">
              Core Team
              <span
                className="info-icon"
                onMouseEnter={(e) => {
                  setShowCoreTeamInfo(true);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCoreTeamInfoPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10
                  });
                }}
                onMouseLeave={() => {
                  setShowCoreTeamInfo(false);
                  setCoreTeamInfoPosition(null);
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCoreTeamInfoPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10
                  });
                }}
              >
                ℹ
              </span>
            </div>
            <div className="core-team-grid">
              {coreTeamRoles.map((role) => (
                <div
                  key={role.name}
                  className="diagram-box-compact tooltip-trigger"
                  onClick={() => setShowStaffingTable(!showStaffingTable)}
                  onMouseEnter={(e) => {
                    setHoveredRole(role.name);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredRole(null);
                    setTooltipPosition(null);
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10
                    });
                  }}
                >
                  {role.name}
                </div>
              ))}
            </div>
          </div>

          {/* Staffing Table - Shown when Core Team button is clicked */}
          {showStaffingTable && (
            <div className="staffing-table-section">
              <div className="staffing-table-header">
                <h3 className="subsection-title">Staffing Breakdown</h3>
                <button
                  className="close-table-btn"
                  onClick={() => setShowStaffingTable(false)}
                  aria-label="Close table"
                >
                  ×
                </button>
              </div>
              <div className="staffing-table-container">
                <table className="staffing-table">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Count</th>
                      <th>Calculation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Core Team</td>
                      <td>{staffing.coreTeam}</td>
                      <td>Fixed (8 members)</td>
                    </tr>
                    <tr>
                      <td>Stream Managers</td>
                      <td>{staffing.streamManagers}</td>
                      <td>{staffing.streams} streams × 1 manager</td>
                    </tr>
                    <tr>
                      <td>Tech Leads</td>
                      <td>{staffing.techLeads}</td>
                      <td>{staffing.streams} streams × 1 tech lead</td>
                    </tr>
                    <tr className="total-row">
                      <td>Staff Total</td>
                      <td>{staffing.totalStaff}</td>
                      <td>Core Team + Managers + Tech Leads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Interactive Scaling Component */}
          <div className="scalability-section">
            <h3 className="subsection-title">Interactive Team Scaling Calculator</h3>
            <div className="scalability-content">
              <div className="scaling-controls">
                <label htmlFor="participants-slider" className="scaling-label">
                  Number of Participants: <span className="participants-value">{participants}</span>
                </label>
                <input
                  id="participants-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="participants-slider"
                />
                <div className="slider-labels">
                  <span>10</span>
                  <span>100</span>
                  <span>500</span>
                  <span>1000</span>
                </div>
                <div className="quick-select-buttons">
                  <button
                    className="quick-select-btn"
                    onClick={() => {
                      setParticipants(10);
                      setSliderPosition(valueToSlider(10));
                    }}
                  >
                    10
                  </button>
                  <button
                    className="quick-select-btn"
                    onClick={() => {
                      setParticipants(100);
                      setSliderPosition(valueToSlider(100));
                    }}
                  >
                    100
                  </button>
                  <button
                    className="quick-select-btn"
                    onClick={() => {
                      setParticipants(500);
                      setSliderPosition(valueToSlider(500));
                    }}
                  >
                    500
                  </button>
                  <button
                    className="quick-select-btn"
                    onClick={() => {
                      setParticipants(1000);
                      setSliderPosition(valueToSlider(1000));
                    }}
                  >
                    1000
                  </button>
                </div>
              </div>

              <div className="scaling-results">
                <div className="results-grid">
                  <div className="result-card">
                    <div className="result-label">Core Team</div>
                    <div className="result-value">{staffing.coreTeam}</div>
                    <div className="result-note">Fixed</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Streams Required</div>
                    <div className="result-value">{staffing.streams}</div>
                    <div className="result-note">{staffing.menteesPerStream} per stream</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Stream Managers</div>
                    <div className="result-value">{staffing.streamManagers}</div>
                    <div className="result-note">1 per stream</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Tech Leads</div>
                    <div className="result-value">{staffing.techLeads}</div>
                    <div className="result-note">1 per stream</div>
                  </div>
                  <div className="result-card total-card">
                    <div className="result-label">Total Staff</div>
                    <div className="result-value">{staffing.totalStaff}</div>
                    <div className="result-note">Required personnel</div>
                  </div>
                </div>

                <div className="scalability-table-container">
                  <table className="scalability-table">
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Count</th>
                        <th>Calculation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Core Team</td>
                        <td>{staffing.coreTeam}</td>
                        <td>Fixed (8 members)</td>
                      </tr>
                      <tr>
                        <td>Stream Managers</td>
                        <td>{staffing.streamManagers}</td>
                        <td>{staffing.streams} streams × 1 manager</td>
                      </tr>
                      <tr>
                        <td>Tech Leads</td>
                        <td>{staffing.techLeads}</td>
                        <td>{staffing.streams} streams × 1 tech lead</td>
                      </tr>
                      <tr className="total-row">
                        <td>Staff Total</td>
                        <td>{staffing.totalStaff}</td>
                        <td>Core Team + Managers + Tech Leads</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="stream-visualization">
                  <h4 className="visualization-title">Stream Distribution Summary</h4>
                  <div className="stream-summary">
                    <div className="stream-summary-card">
                      <div className="summary-icon">📊</div>
                      <div className="summary-content">
                        <div className="summary-label">Total Streams</div>
                        <div className="summary-value">{staffing.streams}</div>
                        <div className="summary-note">Each stream handles up to {staffing.menteesPerStream} mentees</div>
                      </div>
                    </div>
                    
                    <div className="stream-structure-sample">
                      <div className="sample-title">Sample Stream Structure</div>
                      <div className="sample-box">
                        <div className="sample-item">
                          <span className="sample-label">Stream Manager:</span>
                          <span className="sample-value">1 per stream</span>
                        </div>
                        <div className="sample-item">
                          <span className="sample-label">Tech Lead:</span>
                          <span className="sample-value">1 per stream</span>
                        </div>
                        <div className="sample-item">
                          <span className="sample-label">Mentees:</span>
                          <span className="sample-value">Up to {staffing.menteesPerStream} per stream</span>
                        </div>
                      </div>
                    </div>

                    <div className="stream-distribution-info">
                      <div className="distribution-item">
                        <div className="distribution-label">Average mentees per stream:</div>
                        <div className="distribution-value">{Math.round(staffing.participants / staffing.streams)}</div>
                      </div>
                      <div className="distribution-item">
                        <div className="distribution-label">Total participants:</div>
                        <div className="distribution-value">{staffing.participants}</div>
                      </div>
                      {staffing.participants % staffing.menteesPerStream !== 0 && (
                        <div className="distribution-note">
                          <span className="note-icon">ℹ</span>
                          <span>The last stream will have {staffing.participants % staffing.menteesPerStream} mentees</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organizational Structure Overview (Textual Description and Table) */}
          <div className="overview-text">
            <div className="overview-item">
              <h4 className="overview-item-title">Core Team (Fixed)</h4>
              <p className="overview-item-description">
                A permanent coordination group responsible for program governance, delivery control, DevOps support, and architectural oversight. This team ensures consistency, quality standards, and a unified operational model across all streams.
              </p>
            </div>

            <div className="overview-item">
              <h4 className="overview-item-title">Modular Upskilling Teams (Repeatable Units)</h4>
              <p className="overview-item-description">
                Each upskilling stream is formed as an independent, repeatable module consisting of: Stream Manager - ensures delivery flow and communication, Tech Lead - provides technical supervision and guidance.
              </p>
            </div>

            <div className="overview-item">
              <h4 className="overview-item-title">DEV Team (up to 10 mentees)</h4>
              <p className="overview-item-description">
                Participants undergoing the upskilling program. These units can be added based on demand and scaled horizontally.
              </p>
            </div>

            <div className="overview-item">
              <h4 className="overview-item-title">Scalability Responsibility</h4>
              <p className="overview-item-description">
                The requester (customer/unit) is responsible for assembling the required number of upskilling teams. The model supports growth from 10 to 1000 participants by adding modular streams while keeping the Core Team stable.
              </p>
            </div>

            <div className="overview-table-container">
              <table className="overview-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>10 Total Staff</th>
                    <th>100 Total Staff</th>
                    <th>1000 Total Staff</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Core Team</td>
                    <td>8</td>
                    <td>8</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>Stream Managers</td>
                    <td>1</td>
                    <td>10</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Tech Leads</td>
                    <td>1</td>
                    <td>10</td>
                    <td>100</td>
                  </tr>
                  <tr className="total-row">
                    <td>Staff Total</td>
                    <td>10</td>
                    <td>28</td>
                    <td>208</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Section: Scalable Program Delivery & Mentorship Model */}
        <div className="main-section">
          <div className="section-header">
            <h2 className="section-title">Scalable Program Delivery & Mentorship Model</h2>
            <p className="section-subtitle">Modular organizational structure for efficient training programs</p>
          </div>

          {/* Key Advantages */}
          <div className="advantages-section">
            <h3 className="subsection-title">Key Advantages</h3>
            <ul className="advantages-list">
              <li>Modular Design: Easily scales capacity by adding Stream Teams.</li>
              <li>Consistent Quality: Central Tech Leads & Managers.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Role Tooltip */}
      {hoveredRole && tooltipPosition && (
        <div
          className="org-tooltip"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          <div className="org-tooltip-content">
            <div className="org-tooltip-title">
              {coreTeamRoles.find(r => r.name === hoveredRole)?.name}
            </div>
            <div className="org-tooltip-description">
              {coreTeamRoles.find(r => r.name === hoveredRole)?.description}
            </div>
          </div>
        </div>
      )}

      {/* Core Team Overview Tooltip */}
      {showCoreTeamInfo && coreTeamInfoPosition && (
        <div
          className="org-tooltip"
          style={{
            left: `${coreTeamInfoPosition.x}px`,
            top: `${coreTeamInfoPosition.y}px`,
          }}
        >
          <div className="org-tooltip-content">
            <div className="org-tooltip-title">Core Team Overview</div>
            <div className="org-tooltip-description">
              {coreTeamOverview}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


