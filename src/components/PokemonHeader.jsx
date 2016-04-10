import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import utils from '../utils';

export default class PokemonHeader extends Component {
    
    shouldComponentUpdate(nextProps) {
        return nextProps.selectedPokemon !== this.props.selectedPokemon;
    }
    
	render() {
		const { selectedPokemon } = this.props;
        
        const backIcon = require('../imgs/back_icon.png');
        let paddedNumber = utils.padNumber(selectedPokemon.id, 3);

		return (
			<div className="pokemon-header">
                <img src={backIcon} onClick={() => browserHistory.goBack()} />
                <h1 className="number">{paddedNumber}</h1>
                <h1 className="name">{selectedPokemon.name}</h1>
            </div>
		);
	}
}

PokemonHeader.propTypes = {
	selectedPokemon: PropTypes.object.isRequired
}