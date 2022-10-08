import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import { addNote } from "../utils/network-data";
import PropTypes from "prop-types";
import { routes } from "./index";
import content from "../utils/content";
import LocaleContext from "../contexts/LocaleContext";
import CreateNoteLoading from "../components/Loading/CreateNoteLoading";

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
            isCreating: false
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

    async onAddNote() {
        // set isCreating laoding new note to true
        this.setState(() => {
            // console.log("set loading true");
            return {
                isCreating: true
            }
        });

        // adding new note
        // console.log("request to add note");
        const { error } = await addNote(this.state);

        // set isCreating laoding new note to false
        this.setState(() => {
            // console.log("set loading false");
            return {
                isCreating: false
            }
        });

        if (!error) {
            this.props.navigate(routes("home"));
        }
    }

    goToHome() {
        this.props.navigate(routes("home"));
    }

    render() {
        // console.log("render");
        return (
            <LocaleContext.Consumer>
                {
                    ({ locale }) => (
                        <section className="add-new-page">
                            {this.state.isCreating && <CreateNoteLoading />}
                            <div className="add-new-page__input">
                                <input type="text" className="add-new-page__input__title" placeholder={ content[locale].addPage.inputTitle } value={this.state.title} onChange={this.onTitleChange} />
                                <div className="add-new-page__input__body" contentEditable="true" spellCheck="false" data-placeholder={ content[locale].addPage.inputBody } onInput={this.onBodyInput}></div>
                            </div>
                            <div className="add-new-page__action">
                                <Button iconName="back" action={this.goToHome} />
                                <Button iconName="save" action={this.onAddNote} />
                            </div>
                        </section>
                    )
                }
            </LocaleContext.Consumer>
        );
    }
}

AddPage.propTypes = {
    navigate: PropTypes.func.isRequired
};

export default AddPageWrapper;