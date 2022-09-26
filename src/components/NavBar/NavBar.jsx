import React from "react";
import NavMenu from "./NavMenu";
import PropTypes from "prop-types";

function NavBar({ navLinks, children }) {
    return (
        <>
            {children}
            <nav className="navigation">
                <NavMenu navLinks={navLinks}/>
            </nav>
        </>
    );
}

NavBar.propTypes = {
    navLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavBar;