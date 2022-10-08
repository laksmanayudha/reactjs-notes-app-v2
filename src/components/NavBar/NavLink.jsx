import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import content from "../../utils/content";
import LocaleContext from "../../contexts/LocaleContext";

function NavLink({ href,  label}) {

    const { locale } = React.useContext(LocaleContext);

    return (
        <Link to={href}> { content[locale].navBar[label] } </Link>
    );
}

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default NavLink;