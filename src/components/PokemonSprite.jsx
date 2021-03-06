import React, { Component, PropTypes } from 'react';

export default class PokemonSprite extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.pokemonId !== this.props.pokemonId;
  }

  render() {
    const { pokemonId } = this.props;

    const spriteUrl = require('../imgs/sprites/' + pokemonId + '.png');

    return (
      <div className="pokemon-sprite">
        <img src={spriteUrl} />
      </div>
    );
  }
}

PokemonSprite.propTypes = {
  pokemonId: PropTypes.number.isRequired
}