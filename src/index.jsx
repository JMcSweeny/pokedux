import 'babel-polyfill'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from 'history';
import Pokedex from './containers/Pokedex';
import Pokemon from './containers/Pokemon';
import configureStore from './store/configureStore';
import './css/main.css';

const store = configureStore();

const history = useRouterHistory(createHistory)({
  basename: process.env.NODE_ENV === 'production' ? '/pokedux' : '/'
});

render(
  <Provider store={store}>
    <div className="content">
      <Router history={history}>
        <Route path="/" component={Pokedex}>
          <Route path="pokemon/:pokemonId" component={Pokemon}></Route>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
