import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false,
      username: '',
      password: ''
    }

    this.updateUsername = (e) => {
      this.setState({username: e.target.value})
    }
    this.updatePassword = (e) => {
      this.setState({password: e.target.value})
    }

    this.submitLogin = () => {
      if (this.state.username == '' || this.state.password == '') { return; }
      axios.post('/api/login', {
        name: this.state.username,
        password: this.state.password
      }).then(response => {
        console.log(response.data)
        this.setState({logged: true, username: '', password: ''})
        this.props.history.push('/')
      }).catch(error => console.log(error))
    }

    this.submitLogout = () => {
      axios.get('/api/logout').then(response => {
        console.log(response.data)
        this.setState({logged: false})
        this.props.history.push('/')
      }).catch(error => console.log(error))
    }
  }

  componentWillMount() {
    axios.get('/api/logged').then(response => this.setState({logged: response.data})).catch(error => console.log(error))
  }

  render() {

    let form;
    if (this.state.logged) {
      form = (
        <article className="login-form">
          <h3>You are already logged in</h3>

          <button onClick={this.submitLogout}>Logout</button>
        </article>
      )
    } else {
      form = (
        <article className="login-form">

          <input id="user-input" type="text" placeholder="Username" onChange={this.updateUsername}></input>
          <input id="user-input" type="password" placeholder="Password" onChange={this.updatePassword}></input>

          <button onClick={this.submitLogin}>Submit</button>
        </article>
      )
    }

    return (
      <div>
        {form}
      </div>
    )
  }
}

export default Login
