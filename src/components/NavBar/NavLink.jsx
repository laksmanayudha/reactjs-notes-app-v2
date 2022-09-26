import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavLink({ href,  label}) {
    return (
        <Link to={href}> {label} </Link>
    );
}

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default NavLink;