import React from "react";
import { Button } from "evergreen-ui";

const ThemeToggle = () => {
  return (
    <div className="theme-toggle">
      <Button className="theme-button">Dark</Button>
      <Button className="theme-button">Light</Button>
    </div>
  );
};

export default ThemeToggle;
