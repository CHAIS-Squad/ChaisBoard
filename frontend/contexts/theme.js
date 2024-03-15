import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
