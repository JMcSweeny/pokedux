import React, { Component, PropTypes } from 'react';
import utils from '../utils';
import orderBy from 'lodash/orderBy';

export default class PokemonMoves extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.moves !== this.props.moves;
  }

  upperCaseName(name) {
    return name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }

  filterMoves(moves) {
    let filteredMoves = [];

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];

      for (let j = 0; j < move.version_group_details.length; j++) {
        let detail = move.version_group_details[j];

        let versionGroupId = utils.getIdFromUrl(detail.version_group.url);

        let learnMethodId = utils.getIdFromUrl(detail.move_learn_method.url);

        if (versionGroupId === 16 && learnMethodId === 1) {
          filteredMoves.push({
            name: this.upperCaseName(move.move.name),
            level: detail.level_learned_at
          });
        }
      }
    }

    return filteredMoves;
  }

  render() {
    const { moves } = this.props;

    let filteredMoves = orderBy(this.filterMoves(moves), 'level').map(move => {
      return (
        <div className="pokemon-move" key={move.name + move.level}>
          <div className="level">{move.level}</div>
          <div className="name">{move.name}</div>
        </div>
      );
    });

    return (
      <div className="pokemon-moves card">
        <div className="card-title">Moves</div>
        <div className="card-content">
          {filteredMoves}
        </div>
      </div>
    );
  }
}

PokemonMoves.propTypes = {
  moves: PropTypes.array.isRequired,
} 