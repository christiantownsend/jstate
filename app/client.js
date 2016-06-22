//React
import React from 'react';
import ReactDOM from 'react-dom';

//Components
import App from './components/layouts/App.js'

//Router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
)

ReactDOM.render(router, document.getElementById('app'));
