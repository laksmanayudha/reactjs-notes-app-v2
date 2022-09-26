import React from "react";
import PropTypes from "prop-types";

class SearchBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            keyword: props.defaultKeyword || ""
        };

        this.onKeywordChange = this.onKeywordChange.bind(this);
    }

    onKeywordChange(e) {
        this.setState(() => {
            return {
                keyword: e.target.value
            };
        });
        this.props.onSearch(e.target.value);
    }

    render() {
        return (
            <section className="search-bar">
                <input type="text" placeholder="search..." onChange={this.onKeywordChange} value={this.state.keyword} />
            </section>
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    defaultKeyword: PropTypes.string
};

export default SearchBar;