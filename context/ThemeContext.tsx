import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ThemeContextProps {
    colors: { backgroundColor: string; buttonColor: string };
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default function ThemeContextProvider({ children }: PropsWithChildren) {
    const [colors, setColors] = useState({
        backgroundColor: "#fff",
        buttonColor: "#007bff",
    })

    const toggleTheme = () => {
        setColors((prevColors) => ({
          backgroundColor: prevColors.backgroundColor === '#fff' ? '#333' : '#fff',
          buttonColor: prevColors.buttonColor === '#007bff' ? '#f00' : '#007bff',
        }));
      };
    
      return (
        <ThemeContext.Provider value={{ colors, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    };
    
    export const useTheme = (): ThemeContextProps => {
      const context = useContext(ThemeContext);
      if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
      }
      return context;
    };
    