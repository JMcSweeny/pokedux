import 'babel-polyfill'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import Pokedex from './containers/Pokedex';
import Pokemon from './containers/Pokemon';
import configureStore from './store/configureStore';
import './css/main.css';

const store = configureStore();

render(
	<Provider store={store}>
		<div className="content">
            <Router history={browserHistory}>
                <Route path="/" component={Pokedex}>
                    <Route path="/pokemon/:pokemonId" component={Pokemon}></Route>
                </Route>
            </Router>
		</div>
	</Provider>, 
	document.getElementById('root')
);
