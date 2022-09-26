import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getArchivedNotes, searchNote } from "../utils/local-data";
import NotesList from "../components/NotesList/NotesList";
import SearchBar from "../components/SearchBar/SearchBar";
import PropTypes from "prop-types";


function ArchivesPageWrapper() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const onUpdateKeyword = (newKeyword) => {
        setSearchParams({ keyword: newKeyword});
    }

    return <ArchivesPage 
                navigate={navigate} 
                keyword={searchParams.get('keyword')} 
                onUpdateKeyword={onUpdateKeyword} 
            />;
}

class ArchivesPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            keyword: props.keyword || "",
            notes: getArchivedNotes()
        };

        this.onSearch = this.onSearch.bind(this);
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

        let newNotes = this.state.notes.map( note => ({...note, href: `/notes/${note.id}`}))
        newNotes = searchNote(newNotes, this.state.keyword);

        return (
            <section className="archives-page">
                <SearchBar onSearch={this.onSearch} defaultKeyword={this.state.keyword} />
                
                <h2>Catatan Arsip</h2>
                <NotesList notes={newNotes} />
            </section>
        );
    }
}

ArchivesPage.propTypes = {
    navigate: PropTypes.func.isRequired,
    onUpdateKeyword: PropTypes.func.isRequired,
    keyword: PropTypes.string,
};

export default ArchivesPageWrapper;