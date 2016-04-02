import fetch from 'isomorphic-fetch'

export const ROOT_URL = 'http://pokeapi.co/api/v2';

export default function entityAction({types, mapEntitiesToEntity, endpoint }) {
	const [ requestType, successType, failureType ] = types;

	function requestEntity(id) {
		return {
			type: requestType,
			id: id
		}
	}

	function receiveEntity(id, json) {
		return {
			type: successType,
			id: id,
			entity: json
		} 
	}

	function fetchEntity(id) {
		return dispatch => {
			dispatch(requestEntity(id));
			return fetch(`${ROOT_URL}/${endpoint}/${id}`)
				.then(response => response.json())
				.then(json => dispatch(receiveEntity(id, json)));
		}
	}

	function shouldFetchEntity(state, id) {
		const entity = mapEntitiesToEntity(state.entities)[id];

		if(!entity) {
			return true;
		}

		return false;
	}

	return function fetchEntityIfNeeded(id) {
		return(dispatch, getState) => {
			if(shouldFetchEntity(getState(), id)) {
				return dispatch(fetchEntity(id));
			}
		}
	}
}