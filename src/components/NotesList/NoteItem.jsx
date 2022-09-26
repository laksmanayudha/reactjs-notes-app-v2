import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { showFormattedDate } from "../../utils";
import parser from "html-react-parser";

function NoteItem({ title, createdAt, body, href }) {

    return (
        <article className="note-item">
            <h3 className="note-item__title"><Link to={href}>{title}</Link></h3>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{parser(body)}</p>
        </article>
    );
}

NoteItem.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

export default NoteItem;