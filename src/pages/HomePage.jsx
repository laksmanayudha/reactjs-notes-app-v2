import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getActiveNotes, searchNote } from "../utils/network-data";
import Button from "../components/Button/Button";
import NotesList from "../components/NotesList/NotesList";
import SearchBar from "../components/SearchBar/SearchBar";
import PropTypes from "prop-types";
import { routes } from ".";
import content from "../utils/content";
import LocaleContext from "../contexts/LocaleContext";
import Loading from "../components/Loading/Loading";

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
            notes: [],
            initializing: true
        };

        this.goToCreate = this.goToCreate.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    async componentDidMount() {
        const { error, data } = await getActiveNotes();

        if (!error) {
            this.setState(() => {
                return {
                    notes: data,
                    initializing: false
                };
            });
        }

        this.setState(() => {
            return {
                initializing: false
            }
        });
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
            <LocaleContext.Consumer>
                {
                    ({ locale }) => (
                        <section className="homepage">
                            <SearchBar onSearch={this.onSearch} defaultKeyword={this.state.keyword} />
                            
                            <h2>{ content[locale].homePage.noteTitle }</h2>
                            {
                                this.state.initializing 
                                ? <Loading message={content[locale].homePage.loading} />
                                : <NotesList notes={newNotes} />
                            }
                            
                            <div className="homepage__action">
                                <Button iconName="add" action={this.goToCreate} />
                            </div>
                        </section>
                    )
                }
            </LocaleContext.Consumer>
        );
    }
}

HomePage.propTypes = {
    navigate: PropTypes.func.isRequired,
    onUpdateKeyword: PropTypes.func.isRequired,
    keyword: PropTypes.string,
};

export default HomePageWrapper;