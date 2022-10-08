import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";
import content from "../../utils/content";
import LocaleContext from "../../contexts/LocaleContext";

function NotesList({ notes }) {

    const { locale } = React.useContext(LocaleContext);

    if (!notes.length){
        return (
            <section className="notes-list-empty">
                <p className="notes-list__empty">{ content[locale].noNotes }</p>
            </section>
        );
    }

    return (
        <section className="notes-list">
            {notes && notes.map((note) => (
                <NoteItem {...note} key={note.id} />
            ))}
        </section>
    );

}

NotesList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default NotesList;