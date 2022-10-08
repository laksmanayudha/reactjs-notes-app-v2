import React from "react";
import PropTypes from "prop-types";
import { FiLogOut } from "react-icons/fi";

function LogoutButton({ logout, name }) {

    return <button type="button" className="button-logout" onClick={logout}> <FiLogOut /> {name} </button>
}

LogoutButton.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string
};

export default LogoutButton;