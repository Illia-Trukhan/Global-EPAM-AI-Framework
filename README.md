# EPAM AI Framework - Skills Visualization

A React application for visualizing AI skills by role using an interactive two-ring pie chart.

## Features

- **Two-Ring Pie Chart Visualization**
  - Inner ring: Three AI knowledge areas (AI Fundamentals, AI-Driven SDLC, AI-Driven Software Solution)
  - Outer ring: Skills correlated with each AI knowledge area
  - Center: Selected role display

- **Role Selection**
  - Business Analyst (default)
  - Developer
  - Architects
  - Designers
  - DevOps
  - Product Managers
  - Project/Delivery Managers
  - QA & Test Automation
  - Other Roles

- **Dynamic Skills Display**
  - Each role has role-specific skills while maintaining the same three AI knowledge areas
  - Skills are color-coded by their associated AI area

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  ├── components/
  │   ├── AISkillsPieChart.tsx    # Main pie chart component
  │   ├── AISkillsPieChart.css    # Pie chart styles
  │   ├── RoleSelector.tsx         # Role selection dropdown
  │   └── RoleSelector.css         # Selector styles
  ├── data/
  │   └── roleSkills.ts            # Role and skills data
  ├── types.ts                     # TypeScript type definitions
  ├── App.tsx                      # Main app component
  ├── App.css                      # App styles
  ├── main.tsx                     # Entry point
  └── index.css                    # Global styles
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Recharts (for pie chart visualization)

## License

This project is part of the EPAM AI Framework.
