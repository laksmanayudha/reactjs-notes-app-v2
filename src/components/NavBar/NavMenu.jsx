import React from "react";
import NavLink from "./NavLink";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function NavMenu({ navLinks }) {

    const location = useLocation();
    const  pathname = location.pathname;
    
    return (
        <ul>
            {navLinks && navLinks.map((navLink, index) => (
                <li key={index} className={pathname === navLink.href ? "active" : ""}>
                    <NavLink
                        href={navLink.href} 
                        label={navLink.label}  
                    />
                </li>
            ))}
        </ul>
    );
}

NavMenu.propTypes = {
    navLinks: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default NavMenu;