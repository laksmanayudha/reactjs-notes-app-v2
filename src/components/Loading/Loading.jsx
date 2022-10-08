import React from "react";
import PropTypes from "prop-types";

function Loading({ message }) {

    return (
        <div className="loading-container">
            <div className="loading">{ message }</div>
        </div>
    );
}

Loading.propTypes = {
    message: PropTypes.string
};

export default Loading;