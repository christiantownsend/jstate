//React
import React from 'react';
import ReactDOM from 'react-dom';

//Components
import Index from './pages/Index.js'
import Post from './pages/Post.js'

//Router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Index}></Route>
    <Route path="/create-post" component={Post}></Route>
    <Route path="/projects/:postUrl" component={Post}></Route>
  </Router>
)

ReactDOM.render(router, document.getElementById('app'));
