import { createSelector } from 'reselect';
import utils from '../utils';
import isEmpty from 'lodash/isEmpty';

function filterPokedex(pokedex, filter) {
  if (isEmpty(pokedex)) {
    return pokedex;
  }

  return Object.assign({}, pokedex, {
    pokemon_entries: [...pokedex.pokemon_entries].filter(p => {
      return p.pokemon_species.name.toUpperCase().includes(filter.toUpperCase())
    })
  });
}

const pokedexSelector = state => {
  return state.entities.pokedexById[state.selectedPokedex] || {
    data: {},
    isFetching: true
  }
};
const selectedPokedexSelector = state => state.selectedPokedex;
const pokemonFilterSelector = state => state.pokedexFilter;

export const filteredPokedexSelector = createSelector(
  pokedexSelector,
  selectedPokedexSelector,
  pokemonFilterSelector,
  (pokedexById, selectedPokedex, pokemonFilter) => {

    return {
      pokedex: filterPokedex(pokedexById.data, pokemonFilter),
      isFetching: pokedexById.isFetching,
      pokemonFilter,
      selectedPokedex
    };
  }
)
