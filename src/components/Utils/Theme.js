import React from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./DarkMode/useDarkMode";
import { lightTheme, darkTheme } from "./DarkMode/themeStyle";
import { GlobalStyles } from "./DarkMode/global";
import Toggle from "./DarkMode/Toggle";

function Theme() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
    
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        
    </ThemeProvider>
  );
}

export default Theme;
