import React from "react";

function CreateNoteLoading() {
    return (
        <div className="new-notes-loading">
            <p className="new-notes-loading__message">Creating new note ...</p>
            <span className="new-notes-loading__animation"></span>
        </div>
    );
}

export default CreateNoteLoading;