import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { getNote, archiveNote, unarchiveNote, deleteNote } from "../utils/network-data";
import PropTypes from "prop-types";
import NotFound404Page from "./NotFound404Page";
import Button from "../components/Button/Button";
import parser from "html-react-parser";
import { routes } from ".";
import LocaleContext from "../contexts/LocaleContext";
import content from "../utils/content";
import Loading from "../components/Loading/Loading";

function DetailPageWrapper() {

    const { id } = useParams();
    const navigate = useNavigate();

    return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            note: null,
            initializing: true,
        };

        this.onArchiveIn = this.onArchiveIn.bind(this);
        this.onArchiveOut = this.onArchiveOut.bind(this);
        this.onDelete = this.onDelete.bind(this);

    }

    async componentDidMount() {
        const { error, data } = await getNote(this.props.id);

        if (!error) {
            this.setState(() => {
                return {
                    note: data,
                    initializing: false
                };
            });
        }

        this.setState(() => {
            return {
                initializing: false
            };
        });
    }

    async onArchiveIn(){
        const { error } = await archiveNote(this.state.note.id);

        if (!error) {
            if (this.state.note.archived){
                this.props.navigate(routes("archivePage"));
            }else{
                this.props.navigate(routes("home"));
            }
        }
    }

    async onArchiveOut(){
        const { error } = await unarchiveNote(this.state.note.id);
        
        if (!error) {
            if (this.state.note.archived){
                this.props.navigate(routes("archivePage"));
            }else{
                this.props.navigate(routes("home"));
            }
        }
    }

    async onDelete(){
        const { error } = await deleteNote(this.state.note.id);

        if (!error){
            if (this.state.note.archived){
                this.props.navigate(routes("archivePage"));
            }else{
                this.props.navigate(routes("home"));
            }
        }
    }

    render() {

        if(this.state.initializing) {
            return (
                <LocaleContext.Consumer>
                    {
                        ({ locale }) => (<Loading message={content[locale].detailPage.loading} />)
                    }
                </LocaleContext.Consumer>
            )
        }

        if (this.state.note){
            return (
                <section className="detail-page">
                    <h3 className="detail-page__title" >{this.state.note.title}</h3>
                    <p className="detail-page__createdAt">{showFormattedDate(this.state.note.createdAt)}</p>
                    <div className="detail-page__body">{parser(this.state.note.body)}</div>
                    <div className="detail-page__action">
                        {this.state.note.archived 
                            ? <Button iconName="activate" action={this.onArchiveOut}/>
                            : <Button iconName="archive" action={this.onArchiveIn}/>
                        }
                        <Button iconName="delete" action={this.onDelete}/>   
                    </div>
                </section>
            );
        }

        return (
            <NotFound404Page />
        );
    }
}

DetailPage.propTypes = {
    id: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired
};

export default DetailPageWrapper;