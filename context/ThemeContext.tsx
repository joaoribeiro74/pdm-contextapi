import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define um tipo para os temas
type Theme = 'light' | 'dark';

// Define o tipo do contexto
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Cria o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provedor do contexto para envolver o componente raiz
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar o tema em qualquer componente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
