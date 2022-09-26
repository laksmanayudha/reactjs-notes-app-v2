import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import { addNote } from "../utils/local-data";
import PropTypes from "prop-types";
import { routes } from "./index";

function AddPageWrapper() {

    const navigate = useNavigate();
    return <AddPage navigate={navigate} />;
}

class AddPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title: "",
            body: "",
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onBodyInput = this.onBodyInput.bind(this);
        this.onAddNote = this.onAddNote.bind(this);
        this.goToHome = this.goToHome.bind(this);
    }

    onTitleChange(e) {
        this.setState(() => {
            return {
                title: e.target.value
            };
        });
    }
    onBodyInput(e) {
        this.setState(() => {
            return {
                body: e.target.innerHTML
            };
        });
    }

    onAddNote() {
        addNote(this.state);
        this.props.navigate(routes("home"));
    }

    goToHome() {
        this.props.navigate(routes("home"));
    }

    render() {
        
        return (
            <section className="add-new-page">
                <div className="add-new-page__input">
                    <input type="text" className="add-new-page__input__title" placeholder="Judul catatan..." value={this.state.title} onChange={this.onTitleChange} />
                    <div className="add-new-page__input__body" contentEditable="true" spellCheck="false" data-placeholder="Deskripsi catatan..." onInput={this.onBodyInput}></div>
                </div>
                <div className="add-new-page__action">
                    <Button iconName="back" action={this.goToHome} />
                    <Button iconName="save" action={this.onAddNote} />
                </div>
            </section>
        );
    }
}

AddPage.propTypes = {
    navigate: PropTypes.func.isRequired
};

export default AddPageWrapper;