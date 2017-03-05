import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import utils from '../utils';
import PokemonEvolution from '../components/PokemonEvolution';
import PokemonInfo from '../components/PokemonInfo';
import PokemonStats from '../components/PokemonStats';
import PokemonMoves from '../components/PokemonMoves';
import { fetchEvolutionIfNeeded } from '../actions';

class PokemonDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchEvolutionIfNeeded(this.props.evolutionId);
  }

  render() {
    const { pokemon, pokemonSpecies, evolution } = this.props;

    let description = pokemonSpecies.data.flavor_text_entries.filter(entry => entry.language.name == "en")[0].flavor_text;

    return (
      <div className="pokemon-details">
        <div className="info">
          <PokemonInfo pokemonId={pokemon.data.id} height={pokemon.data.height} weight={pokemon.data.weight} types={pokemon.data.types} description={description} />
        </div>
        <div className="stats">
          <PokemonStats height={pokemon.data.height} weight={pokemon.data.weight} stats={pokemon.data.stats} />
        </div>
        <div className="evolution">
          <PokemonEvolution evolution={evolution.data} pokemonId={pokemon.data.id} />
        </div>
        <div className="moves">
          <PokemonMoves moves={pokemon.data.moves} />
        </div>
      </div>
    );
  }
}

PokemonDetails.propTypes = {
  fetchEvolutionIfNeeded: PropTypes.func.isRequired,
  evolution: PropTypes.object.isRequired,
  evolutionId: PropTypes.number.isRequired,
  pokemon: PropTypes.object.isRequired,
  pokemonSpecies: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const {
		entities: { evolutionById }
	} = state;

  const pokemon = ownProps.pokemon;
  const pokemonSpecies = ownProps.pokemonSpecies;

  const evolutionUrl = pokemonSpecies.data.evolution_chain.url;
  const evolutionId = utils.getIdFromUrl(evolutionUrl);

  const evolution = evolutionById[evolutionId] || {
    isFetching: true,
    data: {}
  };

  return {
    pokemon,
    pokemonSpecies,
    evolution,
    evolutionId
  }
}

export default connect(mapStateToProps, {
  fetchEvolutionIfNeeded
})(PokemonDetails);