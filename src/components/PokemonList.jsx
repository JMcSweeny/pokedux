import React, { Component, PropTypes } from 'react';
import PokemonListItem from './PokemonListItem';
import utils from '../utils';

export default class PokemonList extends Component {
    
    shouldComponentUpdate(nextProps) {
        return nextProps.pokemon !== this.props.pokemon;
    }
    
	render() {

		const { pokemon } = this.props;

		let pokemonList = pokemon.map(p => {
			const species = p.pokemon_species;
			
			return(
				<PokemonListItem
					key={p.entry_number}
					number={p.entry_number}
					name={species.name} />
			);
		});

		return (
			<ul className="pokemon-list" id="pokemon-list">
				{pokemonList}
			</ul>
		);
	}
}

PokemonList.propTypes = {
	pokemon: PropTypes.array.isRequired
}