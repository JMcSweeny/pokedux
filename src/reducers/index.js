import { combineReducers } from 'redux';
import entity from './entity';
import * as ActionTypes from '../actions';


const entities = combineReducers({
  pokedexById: entity({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.REQUEST_POKEDEX,
      ActionTypes.RECEIVE_POKEDEX,
      ActionTypes.FAILURE_POKEDEX
    ]
  }),
  pokemonById: entity({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.REQUEST_POKEMON,
      ActionTypes.RECEIVE_POKEMON,
      ActionTypes.FAILURE_POKEMON
    ]
  }),
  pokemonSpeciesById: entity({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.REQUEST_POKEMONSPECIES,
      ActionTypes.RECEIVE_POKEMONSPECIES,
      ActionTypes.FAILURE_POKEMONSPECIES
    ]
  }),
  evolutionById: entity({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.REQUEST_EVOLUTION,
      ActionTypes.RECEIVE_EVOLUTION,
      ActionTypes.FAILURE_EVOLUTION
    ]
  }),
  moveById: entity({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.REQUEST_MOVE,
      ActionTypes.RECEIVE_MOVE,
      ActionTypes.FAILURE_MOVE
    ]
  })
});

function selectedPokedex(state = 1, action) {
  switch (action.type) {
    case ActionTypes.SELECT_POKEDEX:
      return action.id;
    default:
      return state;
  }
}

function pokedexFilter(state = "", action) {
  switch (action.type) {
    case ActionTypes.FILTER_POKEDEX:
      return action.text;
    default:
      return state;
  }
}

function selectedMove(state = 0, action) {
  switch (action.type) {
    case ActionTypes.SELECT_MOVE:
      return action.id;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  entities,
  pokedexFilter,
  selectedPokedex,
  selectedMove
});

export default rootReducer;