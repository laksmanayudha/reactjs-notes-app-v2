import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getActiveNotes, searchNote } from "../utils/local-data";
import Button from "../components/Button/Button";
import NotesList from "../components/NotesList/NotesList";
import SearchBar from "../components/SearchBar/SearchBar";
import PropTypes from "prop-types";
import { routes } from ".";

function HomePageWrapper() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const onUpdateKeyword = (newKeyword) => {
        setSearchParams({ keyword: newKeyword});
    }

    return <HomePage 
                navigate={navigate} 
                keyword={searchParams.get('keyword')} 
                onUpdateKeyword={onUpdateKeyword} 
            />;
}

class HomePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            keyword: props.keyword || "",
            notes: getActiveNotes()
        };

        this.goToCreate = this.goToCreate.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    goToCreate() {
        this.props.navigate(routes("addPage"));
    }

    onSearch(keyword) {
        this.setState(() => {
            return {
                keyword
            }
        });
        this.props.onUpdateKeyword(keyword);
    }

    render() {

        let newNotes = this.state.notes.map( note => ({...note, href: `/notes/${note.id}`}));
        newNotes = searchNote(newNotes, this.state.keyword);

        return (
            <section className="homepage">
                <SearchBar onSearch={this.onSearch} defaultKeyword={this.state.keyword} />
                
                <h2>Catatan Aktif</h2>
                <NotesList notes={newNotes} />
                
                <div className="homepage__action">
                    <Button iconName="add" action={this.goToCreate} />
                </div>
            </section>
        );
    }
}

HomePage.propTypes = {
    navigate: PropTypes.func.isRequired,
    onUpdateKeyword: PropTypes.func.isRequired,
    keyword: PropTypes.string,
};

export default HomePageWrapper;