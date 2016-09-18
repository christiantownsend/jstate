// Dependencies
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

// Redux
import store from './store'

import * as user from './actions/userActions'
import * as posts from './actions/postsActions'

// Routes
import Index from './containers/Index'
import Admin from './containers/Admin'
import Post from './containers/Post'

const app = document.getElementById('app')

const router = (
  <Router history={browserHistory} onEnter={store.dispatch(user.getLogged())}>
    <Route path="/" component={Index}></Route>
    <Route path="/about" component={Index}></Route>
    <Route path="/admin" component={Admin}></Route>
    <Route path="/new-post" component={Post}></Route>
    <Route path="/post/:postUrl" component={Post}></Route>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>
, app)
