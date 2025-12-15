import React from 'react';
import { Role } from '../types';
import './RoleSelector.css';

interface RoleSelectorProps {
  selectedRole: Role;
  onRoleChange: (role: Role) => void;
}

const ROLES: Role[] = [
  'Business Analyst',
  'Developer',
  'Architects',
  'Designers',
  'DevOps',
  'Product Managers',
  'Project/Delivery Managers',
  'QA & Test Automation',
  'Other Roles',
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="role-selector">
      <label htmlFor="role-select" className="role-selector-label">
        Select Role:
      </label>
      <select
        id="role-select"
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value as Role)}
        className="role-select"
      >
        {ROLES.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};
