import React from 'react';
import axios from 'axios'

import Aside from '../components/Aside.js'
import PostsList from '../components/PostsList.js'
import NewPostButton from '../components/NewPostButton.js'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false
    }
  }

  componentWillMount() {
    axios.get('/api/logged').then(response => this.setState({logged: response.data})).catch(error => console.log(error))
  }

  render() {
    return (
    <div>
      {this.state.logged ? <NewPostButton /> : null}
      <Aside />
      <PostsList />
    </div>
    )
  }
}

export default Index;
