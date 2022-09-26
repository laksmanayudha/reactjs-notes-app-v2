import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NotesList({ notes }) {

    if (!notes.length){
        return (
            <section className="notes-list-empty">
                <p className="notes-list__empty">Tidak ada catatan</p>
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