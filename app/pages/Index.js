import React from 'react';

import Aside from '../components/Aside.js'
import PostsList from '../components/PostsList.js'
import NewPostButton from '../components/NewPostButton.js'

class Index extends React.Component {

  render() {
    return (
    <div>
      <NewPostButton />
      <Aside />
      <PostsList />
    </div>
    )
  }
}

export default Index;
