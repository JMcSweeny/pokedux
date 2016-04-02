import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PokemonDetails from './PokemonDetails';
import PokemonHeader from '../components/PokemonHeader';
import Loading from '../components/Loading';
import { 
	fetchPokemonIfNeeded,
    fetchPokemonSpeciesIfNeeded,
	showPokemon
} from '../actions';

class Pokemon extends Component {
	constructor(props) {
		super(props);
		this.hidePokemon = this.hidePokemon.bind(this);
	}

	componentDidMount() {
		this.props.fetchPokemonIfNeeded(this.props.selectedPokemon.id);
        this.props.fetchPokemonSpeciesIfNeeded(this.props.selectedPokemon.id);
    }

	componentWillReceiveProps(nextProps) {
		if(nextProps.selectedPokemon.id !== this.props.selectedPokemon.id) {
			this.props.fetchPokemonIfNeeded(nextProps.selectedPokemon.id);
            this.props.fetchPokemonSpeciesIfNeeded(nextProps.selectedPokemon.id);
		}
	}

	hidePokemon() {
		this.props.showPokemon(false);
	}

	getStyle(pokemonVisible) {
		const style = {};

		if(pokemonVisible) {
			style.display = "flex";
		}

		return style;
	}
    
    renderPokemonDetails(pokemon, pokemonSpecies) {
        if(pokemon.isFetching || pokemonSpecies.isFetching) {
            return (
                <Loading />
            );
        }
        
        return (
            <PokemonDetails
                pokemon={pokemon}
                pokemonSpecies={pokemonSpecies}  />
        );
    }

	render() {
		const { pokemon, pokemonSpecies, pokemonVisible, selectedPokemon } = this.props;

		let style = this.getStyle(pokemonVisible);

		return (
			<div style={style} className="pokemon">
                <PokemonHeader
                    selectedPokemon={selectedPokemon}
                    onBackClick={this.hidePokemon} />
                {this.renderPokemonDetails(pokemon, pokemonSpecies)}
			</div>
		);
	}
}

Pokemon.propTypes = {
	pokemon: PropTypes.object.isRequired,
    pokemonSpecies: PropTypes.object.isRequired,
	fetchPokemonIfNeeded: PropTypes.func.isRequired,
    fetchPokemonSpeciesIfNeeded: PropTypes.func.isRequired,
	selectedPokemon: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	const { 
		entities: { pokemonById, pokemonSpeciesById },
		selectedPokemon,
		pokemonVisible
	 } = state;

	const pokemon = pokemonById[selectedPokemon.id] || {
		isFetching: true,
		data: {}
	};
    
    const pokemonSpecies = pokemonSpeciesById[selectedPokemon.id] || {
		isFetching: true,
		data: {}
	};

	return {
		pokemon,
        pokemonSpecies,
		selectedPokemon,
		pokemonVisible
	}
}

export default connect(mapStateToProps, {
	fetchPokemonIfNeeded,
    fetchPokemonSpeciesIfNeeded,
	showPokemon
})(Pokemon);