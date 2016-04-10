import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import PokemonSprite from './PokemonSprite';
import utils from '../utils';
import LazyLoad from './LazyLoad';

class PokemonListItem extends Component {
	render() {
		const { number, name, visible } = this.props;
 
        let paddedNumber = utils.padNumber(number, 3);

		return (
			<li className="pokemon-list-item card">
                <Link to={{pathname: `/pokemon/${number}`, query: {name}}}>
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
                </Link>
			</li>
		);
	}
}

PokemonListItem.propTypes = {
	name: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired
}

export default LazyLoad(PokemonListItem, 'pokemon-list', 50);