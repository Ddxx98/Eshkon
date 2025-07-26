import React, { useState, useEffect } from 'react';
import { saveThemeConfig, loadThemeConfig } from '../../utils/localStorage.js';

export const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => loadThemeConfig() || {
    primary: '#0070f3',
    font: 'system-ui',
  });

  useEffect(() => {
    saveThemeConfig(theme);
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', theme.primary);
      document.documentElement.style.fontFamily = theme.font;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
