import React from 'react';
import './ProcessSequence.css';

interface SequenceStep {
  stepNumber: number;
  role: 'Contributor' | 'Team Manager';
  action: string;
  phase: string;
  connectsTo?: number; // Step number this connects to
}

const sequenceSteps: SequenceStep[] = [
  {
    stepNumber: 1,
    role: 'Contributor',
    action: 'Apply to program',
    phase: 'Initiation',
    connectsTo: 2
  },
  {
    stepNumber: 2,
    role: 'Contributor',
    action: 'Complete theoretical part',
    phase: 'Theoretical Part (Self-paced)',
    connectsTo: 3
  },
  {
    stepNumber: 3,
    role: 'Contributor',
    action: 'Apply to Practical part',
    phase: 'Theoretical Part (Self-paced)',
    connectsTo: 4
  },
  {
    stepNumber: 4,
    role: 'Team Manager',
    action: 'Onboard contributor to Dev Team and assign a task',
    phase: 'Waiting for Project',
    connectsTo: 5
  },
  {
    stepNumber: 5,
    role: 'Contributor',
    action: 'Complete ≥1 task',
    phase: 'Practical Part',
    connectsTo: 6
  },
  {
    stepNumber: 6,
    role: 'Team Manager',
    action: 'Send knowledge check',
    phase: 'Practical Part',
    connectsTo: 10
  },
  {
    stepNumber: 8,
    role: 'Team Manager',
    action: 'Assign AI UpSkill Program Badge',
    phase: 'Practical Part',
    connectsTo: 9
  },
  {
    stepNumber: 9,
    role: 'Team Manager',
    action: 'Provide list of gained skills',
    phase: 'Practical Part',
    connectsTo: 11
  },
  {
    stepNumber: 10,
    role: 'Contributor',
    action: 'Pass knowledge check',
    phase: 'Practical Part',
    connectsTo: 8
  },
  {
    stepNumber: 11,
    role: 'Contributor',
    action: 'Add gained skills to Telescope profile',
    phase: 'Ending'
  }
];

export const ProcessSequence: React.FC = () => {
  return (
    <div className="process-sequence-container">
      <h2 className="sequence-title">Process Sequence & Role Interactions</h2>
      
      <div className="sequence-timeline">
        {sequenceSteps
          .sort((a, b) => a.stepNumber - b.stepNumber)
          .map((step, index, sortedArray) => {
            const isContributor = step.role === 'Contributor';
            const isLast = index === sortedArray.length - 1;
            const hasConnection = step.connectsTo !== undefined;
            const nextStep = sortedArray[index + 1];
            const roleChanges = nextStep && nextStep.role !== step.role;
            
            return (
              <React.Fragment key={step.stepNumber}>
                <div className={`sequence-step ${isContributor ? 'contributor' : 'manager'}`}>
                  <div className="step-number">{step.stepNumber}</div>
                  <div className="step-content">
                    <div className="step-role">{step.role}</div>
                    <div className="step-action">{step.action}</div>
                    {step.phase && <div className="step-phase">{step.phase}</div>}
                  </div>
                  {hasConnection && (
                    <div className="connection-indicator">
                      → Step {step.connectsTo}
                    </div>
                  )}
                </div>
                
                {!isLast && (
                  <div className={`sequence-connector ${isContributor ? 'contributor' : 'manager'} ${roleChanges ? 'role-change' : ''}`}>
                    <div className="connector-line"></div>
                    {roleChanges && (
                      <div className="role-change-indicator">
                        {isContributor ? '↓ To Team Manager' : '↓ To Contributor'}
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>

      <div className="sequence-legend">
        <div className="legend-item">
          <div className="legend-color contributor"></div>
          <span>Contributor Actions</span>
        </div>
        <div className="legend-item">
          <div className="legend-color manager"></div>
          <span>Team Manager Actions</span>
        </div>
        <div className="legend-item">
          <div className="legend-arrow">→</div>
          <span>Direct Connection to Another Step</span>
        </div>
      </div>
    </div>
  );
};
