import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Pokedex from './containers/Pokedex';
import Pokemon from './containers/Pokemon';
import configureStore from './store/configureStore';
import './css/main.css';

const store = configureStore();

render(
	<Provider store={store}>
		<div className="content">
			<Pokedex />
			<Pokemon />
		</div>
	</Provider>, 
	document.getElementById('root')
);