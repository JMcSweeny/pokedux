import React, { Component, PropTypes } from 'react';

export default class PokemonType extends Component {
    
    getTypeProperties(typeId) {
        switch(typeId) {
            case 1:
                return {
                    name: 'Normal',
                    color: '#BDBDBD'
                };
            case 2:
                return {
                    name: 'Fighting',
                    color: '#F44336'
                };
            case 3:
                return {
                    name: 'Flying',
                    color: '#4FC3F7'
                };
            case 4:
                return {
                    name: 'Poison',
                    color: '#9C27B0'
                };
            case 5:
                return {
                    name: 'Ground',
                    color: '#4E342E'
                };
            case 6:
                return {
                    name: 'Rock',
                    color: '#795548'
                };
            case 7:
                return {
                    name: 'Bug',
                    color: '#8BC34A'
                };
            case 8:
                return {
                    name: 'Ghost',
                    color: '#4527A0'
                };
            case 9:
                return {
                    name: 'Steel',
                    color: '#616161'
                };
            case 10:
                return {
                    name: 'Fire',
                    color: '#F57C00'
                };
            case 11:
                return {
                    name: 'Water',
                    color: '#1565C0'
                };
            case 12:
                return {
                    name: 'Grass',
                    color: '#4CAF50'
                };
            case 13:
                return {
                    name: 'Electric',
                    color: '#FFEB3B',
                    font: '#212121'
                };
            case 14:
                return {
                    name: 'Psychic',
                    color: '#4A148C'
                };
            case 15:
                return {
                    name: 'Ice',
                    color: '#2196F3'
                };
            case 16:
                return {
                    name: 'Dragon',
                    color: '#2196F3'
                };
            case 17:
                return {
                    name: 'Dark',
                    color: '#212121'
                };
            case 18:
                return {
                    name: 'Fairy',
                    color: '#EC407A'
                };
            default:
                return {
                    name: 'Unknown'
                };
        }
    }
    
	render() {
		const { typeId } = this.props;
            
        const typeProperties = this.getTypeProperties(typeId);
        
        const style = {
            backgroundColor: typeProperties.color,
            color: typeProperties.font || '#FAFAFA'
        };

		return (
			<div className="pokemon-type" style={style}>
                <div className="name">{typeProperties.name}</div>
            </div>
		);
	}
}

PokemonType.propTypes = {
	typeId: PropTypes.number.isRequired
}