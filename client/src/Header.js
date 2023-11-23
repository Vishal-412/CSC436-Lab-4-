import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./contexts";

// Define the Header component
const Header = ({ text }) => {
  // Use the useContext hook to access the primaryColor from the ThemeContext
  const { primaryColor } = useContext(ThemeContext);

  // Render an h1 element with the specified text and color from the theme
  return <h1 style={{ color: primaryColor }}>{text}</h1>;
};
// Export the Header component as the default export
export default Header;