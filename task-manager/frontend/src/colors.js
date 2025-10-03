// Color palette inspired by MissionPerform branding

export const colors = {
  // Primary colors
  primary: '#2196F3',        // Blue (main brand color)
  primaryDark: '#1976D2',    // Darker blue for hover states
  primaryLight: '#64B5F6',   // Lighter blue for accents

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',

  // Background colors
  background: '#F5F5F5',     // Light gray for app background
  backgroundDark: '#E0E0E0', // Slightly darker gray

  // Text colors
  textPrimary: '#212121',    // Dark gray for primary text
  textSecondary: '#757575',  // Medium gray for secondary text
  textLight: '#FFFFFF',      // White text on dark backgrounds

  // Status colors (for tasks)
  statusTodo: '#9E9E9E',     // Gray for "To Do"
  statusInProgress: '#00BCD4', // Cyan for "In Progress"
  statusDone: '#4CAF50',     // Green for "Done"

  // UI element colors
  border: '#E0E0E0',         // Light gray for borders
  hover: '#22a6feff',          // Very light blue for hover states
  shadow: 'rgba(0, 0, 0, 0.1)', // Subtle shadow
}

// CSS custom properties version (for use in CSS files)
export const cssVariables = `
  --color-primary: ${colors.primary};
  --color-primary-dark: ${colors.primaryDark};
  --color-primary-light: ${colors.primaryLight};
  --color-white: ${colors.white};
  --color-black: ${colors.black};
  --color-background: ${colors.background};
  --color-background-dark: ${colors.backgroundDark};
  --color-text-primary: ${colors.textPrimary};
  --color-text-secondary: ${colors.textSecondary};
  --color-text-light: ${colors.textLight};
  --color-status-todo: ${colors.statusTodo};
  --color-status-in-progress: ${colors.statusInProgress};
  --color-status-done: ${colors.statusDone};
  --color-border: ${colors.border};
  --color-hover: ${colors.hover};
  --color-shadow: ${colors.shadow};
`;
