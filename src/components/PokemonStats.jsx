import React, { Component, PropTypes } from 'react';

const StatBar = props => {
  const style = {
    width: props.value / 2 + '%'
  };

  return (
    <div className="stat-bar">
      <div className="name">{props.name}</div>
      <div className="bar">
        <div className="fill" style={style}><span>{props.value}</span></div>
      </div>
    </div>
  );
}

export default class PokemonStats extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.stats !== this.props.stats;
  }

  render() {
    const stats = this.props.stats.reduce((newStat, oldStat) => {
      newStat[oldStat.stat.name] = oldStat.base_stat;
      return newStat;
    }, {});

    return (
      <div className="pokemon-stats card">
        <div className="card-title">Stats</div>
        <div className="card-content">
          <div className="stats">
            <StatBar name="HP" value={stats['hp']} />
            <StatBar name="Attack" value={stats['attack']} />
            <StatBar name="Defense" value={stats['defense']} />
            <StatBar name="Speed" value={stats['speed']} />
            <StatBar name="Sp Attack" value={stats['special-attack']} />
            <StatBar name="SP Defense" value={stats['special-defense']} />
          </div>
        </div>
      </div>
    );
  }
}

PokemonStats.propTypes = {
  stats: PropTypes.array.isRequired
}