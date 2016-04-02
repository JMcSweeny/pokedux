import React, { Component, PropTypes } from 'react';
import utils from '../utils';

export default class PokemonHeader extends Component {
    
    shouldComponentUpdate(nextProps) {
        return nextProps.selectedPokemon !== this.props.selectedPokemon;
    }
    
	render() {
		const { selectedPokemon, onBackClick } = this.props;
        
        const backIcon = require('../imgs/back_icon.png');
        let paddedNumber = utils.padNumber(selectedPokemon.id, 3);

		return (
			<div className="pokemon-header">
                <img src={backIcon} onClick={onBackClick} />
                <h1 className="number">{paddedNumber}</h1>
                <h1 className="name">{selectedPokemon.name}</h1>
            </div>
		);
	}
}

PokemonHeader.propTypes = {
	selectedPokemon: PropTypes.object.isRequired,
    onBackClick: PropTypes.func.isRequired
}