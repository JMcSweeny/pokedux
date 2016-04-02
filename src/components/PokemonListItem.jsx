import React, { Component, PropTypes } from 'react';
import PokemonSprite from './PokemonSprite';
import utils from '../utils';
import LazyLoad from './LazyLoad';

class PokemonListItem extends Component {
	render() {
		const { number, name, handleClick, visible } = this.props;
 
        let paddedNumber = utils.padNumber(number, 3);

		return (
			<li className="pokemon-list-item card" onClick={handleClick}>
				<div className="pokemon-list-item-content card-content">
                    <div className="sprite">
                    {visible &&
                        <div className="fade-in">
                            <PokemonSprite pokemonId={number} />
                        </div>
                    }
                    </div>
                    
                    <div className="text">
                        <div className="number">{utils.padNumber(number, 3)}</div>
                        <div className="name">{name}</div>
                    </div>
				</div>
			</li>
		);
	}
}

PokemonListItem.propTypes = {
	handleClick: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired
}

export default LazyLoad(PokemonListItem, 'pokemon-list', 50);