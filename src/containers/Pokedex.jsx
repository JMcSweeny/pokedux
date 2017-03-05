import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PokemonList from '../components/PokemonList';
import PokemonSearch from '../components/PokemonSearch';
import Loading from '../components/Loading';
import { filteredPokedexSelector } from '../selectors';
import { fetchPokedexIfNeeded, filterPokedex } from '../actions';

class Pokedex extends Component {
	constructor(props) {
		super(props);
		this.onPokemonSearch = this.onPokemonSearch.bind(this);
	}

	componentDidMount() {
		this.props.fetchPokedexIfNeeded(this.props.selectedPokedex);
	}

	onPokemonSearch(text) {
		this.props.filterPokedex(text);
    }
    
    renderPokemon() {
        if(this.props.location.pathname !== '/') {
            return this.props.children;
        }
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
				<PokemonSearch handleChange={this.onPokemonSearch} />
				<PokemonList pokemon={pokemonList} />
        <div>
          {this.renderPokemon()}  
        </div>    
			</div>
		);
	}
}

Pokedex.propTypes = {
	pokedex: PropTypes.object.isRequired,
	fetchPokedexIfNeeded: PropTypes.func.isRequired,
	filterPokedex: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
	pokemonFilter: PropTypes.string.isRequired
};

export default connect(filteredPokedexSelector, {
	fetchPokedexIfNeeded,
	filterPokedex
})(Pokedex);