import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

import * as posts from '../actions/postsActions'

import Header from '../components/Header'
import PostsList from '../components/PostsList'

@connect((store) => {
  return {
    logged: store.user.logged,
    loading: store.posts.fetching,
    postsList: store.posts.postsList
  }
})
class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.props.dispatch(posts.fetchPostsList())
  }

  render() {
    return (
      <div className="container">

        <Header logged={this.props.logged}/>

        <PostsList loading={this.props.loading} postsList={this.props.postsList}/>

      </div>
    )
  }
}

export default Index
