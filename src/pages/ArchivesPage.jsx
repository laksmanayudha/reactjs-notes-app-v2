import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getArchivedNotes, searchNote } from "../utils/network-data";
import NotesList from "../components/NotesList/NotesList";
import SearchBar from "../components/SearchBar/SearchBar";
import PropTypes from "prop-types";
import content from "../utils/content";
import LocaleContext from "../contexts/LocaleContext";
import Loading from "../components/Loading/Loading";

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
            notes: [],
            initializing: true,
        };

        this.onSearch = this.onSearch.bind(this);
    }

    async componentDidMount() {
        const { error, data } = await getArchivedNotes();

        if (!error) {
            this.setState(() => {
                return {
                    notes: data,
                    initializing: false
                }
            })
        }

        this.setState(() => {
            return {
                initializing: false
            }
        });
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
            <LocaleContext.Consumer>
                {
                    ({ locale }) => (
                        <section className="archives-page">
                            <SearchBar onSearch={this.onSearch} defaultKeyword={this.state.keyword} />
                            
                            <h2>{ content[locale].archivePage.noteTitle }</h2>
                            {
                                this.state.initializing 
                                ? <Loading message={content[locale].archivePage.loading} />
                                : <NotesList notes={newNotes} />
                            }
                        </section>
                    )
                }
            </LocaleContext.Consumer>
        );
    }
}

ArchivesPage.propTypes = {
    navigate: PropTypes.func.isRequired,
    onUpdateKeyword: PropTypes.func.isRequired,
    keyword: PropTypes.string,
};

export default ArchivesPageWrapper;