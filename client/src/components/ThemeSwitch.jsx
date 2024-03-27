import useStore from "@/store";
import React, { useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useStore();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  //   console.log(isDarkMode);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={`switch ${isDarkMode ? "light" : "dark"}`}
      onClick={toggleTheme}
    >
      <div className={`ball ${isDarkMode ? "dark" : "light"}`}></div>
    </div>
  );
};

export default ThemeSwitch;
