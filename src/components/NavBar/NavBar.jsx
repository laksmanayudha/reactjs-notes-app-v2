import React from "react";
import NavMenu from "./NavMenu";
import PropTypes from "prop-types";
import { FiMenu } from "react-icons/fi";

function NavBar({ title, navLinks, children }) {

    const [toggle, setToggle] = React.useState(false);

    const changeToggle = () => {
        setToggle((prevToggle) => {
            return !prevToggle;
        });
    }

    return (
        <>
            <div className="navbar-header">
                <h1>{ title }</h1>
                <button onClick={changeToggle} ><FiMenu /></button>
            </div>
            <div className={`navbar-body ${toggle ? "collapse" : ""}`}>
                <nav className="navigation">
                    <NavMenu navLinks={navLinks}/>
                </nav>
                <div className="navbar-additional">
                    {children}
                </div>
            </div>
        </>
    );
}

NavBar.propTypes = {
    title: PropTypes.string,
    navLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavBar;