import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import ThemeContext from "../../contexts/ThemeContext";

function ToggleThemeButton() {

    const { theme, changeTheme } = React.useContext(ThemeContext);

    return <button onClick={changeTheme} className="toggle-theme">{ theme === "light" ? <FiMoon /> : <FiSun /> }</button>
}

export default ToggleThemeButton;