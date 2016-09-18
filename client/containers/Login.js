import React from 'react'
import { connect } from 'react-redux'

import { login } from '../actions/userActions'

@connect()
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      password: ''
    }

    this.updateName = (e) => {
      this.setState({name: e.target.value})
    }

    this.updatePassword = (e) => {
      this.setState({password: e.target.value})
    }

    this.handleLogin = () => {
      this.props.dispatch(login(this.state.name, this.state.password))
    }
  }

  render() {
    return (
      <div className="container">
        <input type="text" placeholder="username" onChange={this.updateName} value={this.state.name}></input>
        <input type="password" placeholder="password" onChange={this.updatePassword} value={this.state.password}></input>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

export default Login
