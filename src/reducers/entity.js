export default function entity({ types, mapActionToKey }) {
	const [ requestType, successType, failureType ] = types;

	function updateEntity(state = {
		isFetching: false,
		data: {}
	}, action) {
		switch(action.type) {
			case requestType:
				return Object.assign({}, state, {
					isFetching: true
				});
			case successType:
				return Object.assign({}, state, {
					isFetching: false,
					data: action.entity
				});
			case failureType:
				return Object.assign({}, state, {
					isFetching: false
				});
			default:
				return state;
		}
	}

	return function updateEntityByKey(state = {}, action) {
		switch (action.type) {
			case requestType:
			case successType:
			case failureType:
				const key = mapActionToKey(action);
				return Object.assign({}, state, {
					[key]: updateEntity(state[key], action)
				});
			default:
				return state;
		}
	}
}