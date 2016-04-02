import React, { Component, PropTypes } from 'react';

export default class PokemonSearch extends Component {
    constructor(props) {
        super(props);
        this.handleClear = this.handleClear.bind(this);
    }
    
    handleClear() {
        this.props.handleChange("");
        this.refs.search.value = "";
    }

	render() {
		const { handleChange } = this.props;

		const searchIcon = require('../imgs/search_icon.png');
        const clearIcon = require('../imgs/clear_icon.png');
        
        const hasInput = () => this.refs.search && this.refs.search.value;
        
        const clearStyle = {
            visibility: hasInput() ? 'visible' : 'hidden'   
        };  

		return (
			<div className="pokemon-search">
				<div className="search-icon">
					<img src={searchIcon} /> 
				</div>
				<input type="text" 
                    placeholder="Search" 
                    ref="search"
                    onInput={(e) => handleChange(e.target.value)} />
                <div className="clear" onClick={this.handleClear} style={clearStyle}>
                    <img src={clearIcon} />
                </div>               
			</div>
		);
	}
}

PokemonSearch.propTypes = {
	handleChange: PropTypes.func.isRequired
}