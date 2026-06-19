import React, { createContext, useState, useContext } from 'react';
import { themes } from './factory';
import { log } from '../utils/logger/logger';
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('cyberpunk');

  const toggleTheme = (name) => {
    if (themes[name]) {
      setThemeName(name);
    } else {
      log.warn(`Тема "${name}" не найдена.`);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[themeName].colors,
        themeName,
        setThemeName: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme должен быть использован внутри ThemeProvider');
  }
  return context;
};
