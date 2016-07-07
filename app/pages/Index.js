import React from 'react';

import Aside from '../components/Aside.js'
import PostsList from '../components/PostsList.js'

class Index extends React.Component {

  render() {
    return (
    <div>
      <Aside />
      <PostsList />
    </div>
    )
  }
}

export default Index;
