import React from "react";
import { FiPlus, FiCheck, FiTrash, FiCornerUpLeft  } from "react-icons/fi";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import PropTypes from "prop-types";

const Icons = {
    "add": <FiPlus />,
    "save": <FiCheck />,
    "delete": <FiTrash />,
    "archive": <BiArchiveIn />,
    "activate": <BiArchiveOut />,
    "back": <FiCornerUpLeft />
};

function Button({ iconName, action }) {

    return <button className="action" type="button" onClick={action}> {Icons[iconName]} </button>;
}

Button.propTypes = {
    iconName: PropTypes.oneOf(Object.keys(Icons)).isRequired,
    action: PropTypes.func.isRequired
};

export default Button;