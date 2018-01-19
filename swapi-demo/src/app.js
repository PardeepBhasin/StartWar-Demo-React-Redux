import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import {HashRouter, Route, Redirect} from 'react-router-dom';
import StarwarDashboardComponent from './containers/layout';
import LoginComponent from './containers/login';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
     <HashRouter>
        <div>
          <Route path="/login" name="" component={LoginComponent}/>
          <Route path="/dashboard" component={StarwarDashboardComponent}/>
        </div>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
