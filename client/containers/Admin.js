import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'

@connect((store) => {
  return {
    loading: store.user.loading,
    logged: store.user.logged
  }
})
class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  pageRender() {
    if (!this.props.logged) {
      return (
        <Login />
      )
    }

    return (
      <h1>Admin Page</h1>
    )
  }

  render() {
    return (
      <div className="container">
        {this.props.loading ? null : this.pageRender()}
      </div>
    )
  }
}

export default Admin
