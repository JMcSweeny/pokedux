import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PokemonDetails from './PokemonDetails';
import PokemonHeader from '../components/PokemonHeader';
import Loading from '../components/Loading';
import { fetchPokemonIfNeeded, fetchPokemonSpeciesIfNeeded} from '../actions';

class Pokemon extends Component {
	constructor(props) {
		super(props);
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
                <div className="pokemon-container">
                    <PokemonHeader selectedPokemon={selectedPokemon} />
                    {this.renderPokemonDetails(pokemon, pokemonSpecies)}
                </div>
                
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

function mapStateToProps(state, ownProps) {
	const { 
		entities: { pokemonById, pokemonSpeciesById }
	} = state;

    const selectedPokemon = {
        id: ownProps.params.pokemonId,
        name: ownProps.location.query.name
    }

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
		selectedPokemon
	}
}

export default connect(mapStateToProps, {
	fetchPokemonIfNeeded,
    fetchPokemonSpeciesIfNeeded
})(Pokemon);