import React from 'react'
import { Link } from 'react-router'

import PostCard from '../components/PostCard'
import Loader from '../components/Loader'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

class PostsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    let postsList = this.props.postsList.map((post, key) =>
      <PostCard
        key={key}
        title={post.title}
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        image="http://fillmurray.com/300/300"
        url={post.url}
        creator={post.creator}
        date={monthNames[parseInt(post.date.split('-')[1]) - 1] + " " + post.date.split('-')[2] +  ", " + post.date.split('-')[0]}
      />
    )

    return (
      <main>
        {postsList}
        {this.props.loading ? <Loader /> : null}
      </main>
    )
  }
}

export default PostsList
