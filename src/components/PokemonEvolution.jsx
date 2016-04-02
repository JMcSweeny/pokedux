import React, { Component, PropTypes } from 'react';
import PokemonSprite from './PokemonSprite';
import reduce from 'lodash/reduce';
import flatten from 'lodash/flatten';
import utils from '../utils';

export default class PokemonEvolution extends Component {
    
    shouldComponentUpdate(nextProps) {
        return nextProps.evolution !== this.props.evolution;
    }
    
     getEvolutions(evolutionChain) {
         return reduce(evolutionChain, (result, value) => {
             if(evolutionChain.evolves_to.length === 0) {
                 return result;
             }
             
             let evolutions = evolutionChain.evolves_to.map(chain => {
                return [
                    { 
                        name: evolutionChain.species.name, 
                        id: utils.getIdFromUrl(evolutionChain.species.url),
                        level: chain.evolution_details.min_level,
                        to: {
                            name: chain.species.name,
                            id: utils.getIdFromUrl(chain.species.url),
                            level: chain.evolution_details.min_level
                        }
                    },
                    ...this.getEvolutions(chain)
                ];
             });
             
             return flatten(evolutions);
         }, []);
    }
    
    renderEvolution(evolution) {
        return (
            <div className="evolution" onClick={() => this.props.onPokemonClick({id: evolution.id, name: evolution.name})} key={evolution.id}>
                <PokemonSprite pokemonId={evolution.id} />
                <div className="name">{evolution.name}</div>
                {evolution.level && 
                <div className="level">Level: {evolution.level}</div>
                }
            </div>
        );
    }
    
	render() {
		const { pokemonId, evolution } = this.props;
        
        let evolutions = this.getEvolutions(evolution.chain);
        
        let toThisPokemon = evolutions.filter(evolution => evolution.to.id == pokemonId).map(evolution => this.renderEvolution(evolution));
        let fromThisPokemon = evolutions.filter(evolution => evolution.id == pokemonId).map(evolution => this.renderEvolution(evolution.to));

		return (
            <div className="pokemon-evolutions">
                {toThisPokemon.length > 0 &&
                <div className="evolution-card card">
                    <div className="card-title">Evolves From</div>
                    <div className="card-content evolution-card-content">
                        {toThisPokemon}
                    </div>
                    
                </div>
                }
                {fromThisPokemon.length > 0 &&
                <div className="evolution-card card">
                    <div className="card-title">Evolves To</div>
                    <div className="card-content evolution-card-content">
                        {fromThisPokemon}
                    </div>
                </div>
                }
            </div>
		);
	}
}

PokemonEvolution.propTypes = {
	evolution: PropTypes.object.isRequired,
    pokemonId: PropTypes.number.isRequired,
    onPokemonClick: PropTypes.func.isRequired
} 