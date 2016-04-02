import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PokemonList from '../components/PokemonList';
import PokemonSearch from '../components/PokemonSearch';
import Loading from '../components/Loading';
import { filteredPokedexSelector } from '../selectors';
import { 
	fetchPokedexIfNeeded,
	filterPokedex,
	selectPokemon,
	showPokemon
} from '../actions';

class Pokedex extends Component {
	constructor(props) {
		super(props);
		this.onPokemonClick = this.onPokemonClick.bind(this);
		this.onPokemonSearch = this.onPokemonSearch.bind(this);
	}

	componentDidMount() {
		this.props.fetchPokedexIfNeeded(this.props.selectedPokedex);
	}

	onPokemonSearch(text) {
		this.props.filterPokedex(text);
    }

	onPokemonClick(pokemon) {
		this.props.selectPokemon(pokemon);
		this.props.showPokemon(true);
	}

	render() {
		const { pokedex, isFetching, pokedexFilter } = this.props;
		const { pokemon_entries: pokemonList } = pokedex;

		if(isFetching) {
			return (
                <Loading />
            );
		}

		return (
			<div className="pokedex">
				<PokemonSearch
					handleChange={this.onPokemonSearch} />
				<PokemonList 
					pokemon={pokemonList}
					onPokemonClick={this.onPokemonClick} />
			</div>
		);
	}
}

Pokedex.propTypes = {
	pokedex: PropTypes.object.isRequired,
	fetchPokedexIfNeeded: PropTypes.func.isRequired,
	selectPokemon: PropTypes.func.isRequired,
	filterPokedex: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
	showPokemon: PropTypes.func.isRequired,
	pokemonFilter: PropTypes.string.isRequired
};

export default connect(filteredPokedexSelector, {
	fetchPokedexIfNeeded,
	selectPokemon,
	filterPokedex,
	showPokemon
})(Pokedex);