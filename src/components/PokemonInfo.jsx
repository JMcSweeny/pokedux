import React, { Component, PropTypes } from 'react';
import PokemonSprite from './PokemonSprite';
import PokemonType from './PokemonType';
import utils from '../utils';
import orderBy from 'lodash/orderBy';

export default class PokemonInfo extends Component {
    
    shouldComponentUpdate(nextProps) {
        return nextProps.pokemonId !== this.props.pokemonId;
    }
    
	render() {
		const pokemonId = this.props.pokemonId;        
        const description = this.props.description;      
        const height = this.props.height/10;
        const weight = this.props.weight/10;
        
        const types = orderBy(this.props.types, 'slot').map(type => {
            const typeId = utils.getIdFromUrl(type.type.url);
            
             return (
                 <PokemonType typeId={typeId} key={typeId} />   
             );
        });

		return (
            <div className="card pokemon-info">
                <div className="card-content pokemon-info-content">
                    <div className="top">
                        <div className="sprite">
                            <PokemonSprite pokemonId={pokemonId} />
                        </div>
                        <div className="right">
                            <div className="height-weight">
                                <div>
                                    <span>Height</span><span>{height + 'm'}</span>
                                </div>
                                <div>
                                    <span>Weight</span><span>{weight + 'kg'}</span>
                                </div>   
                            </div>
                            <div className="types">
                                {types}
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
		);
	}
}

PokemonInfo.propTypes = {
	pokemonId: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired
}