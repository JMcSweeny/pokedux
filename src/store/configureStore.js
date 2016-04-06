import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

let middleware = [thunkMiddleware];

if(process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger()]
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	return store;
}
