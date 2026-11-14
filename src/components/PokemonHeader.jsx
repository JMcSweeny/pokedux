import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import utils from '../utils';

export default class PokemonHeader extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.selectedPokemon !== this.props.selectedPokemon;
  }

  render() {
    const { selectedPokemon } = this.props;

    let paddedNumber = utils.padNumber(selectedPokemon.id, 3);
    
    const backIcon = `${import.meta.env.BASE_URL}imgs/back_icon.png`;

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