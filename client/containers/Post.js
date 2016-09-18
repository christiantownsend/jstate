import React from 'react'
import { connect } from 'react-redux'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'

import * as posts from '../actions/postsActions'
import Header from '../components/Header'
import PostTitle from '../components/PostTitle'
import RichEditor from '../components/RichEditor'
import Loader from '../components/Loader'

//convertToRaw(this.refs.content.state.editorState.getCurrentContent())))s

@connect((store) => {
  return {
    logged: store.user.logged,
    loading: store.posts.fetching,
    loaded: store.posts.fetched,
    currentPost: store.posts.currentPost,
    creating: store.posts.creating,
    editing: store.posts.editing
  }
})
class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ''
    }

    this.createPost = () => {

    }
  }

  componentDidMount() {
    if (this.props.location.pathname == '/new-post') {
      this.props.dispatch(posts.creatingPost(true))
    } else {
      this.props.dispatch(posts.fetchPost(this.props.params.postUrl))
    }
  }

  renderPageContent() {
    if (this.props.creating || this.props.loaded) {
      return (
        <div className="post-content">
          <PostTitle
            ref="postTitle"
            editing={this.props.editing}
            initialTitle={this.props.currentPost.title}
          />
          <RichEditor ref="content" creating={this.props.creating} content={this.props.currentPost.content} editing={this.props.editing}/>
        </div>
      )
    } else {
      return <Loader />
    }
  }

  render() {
    return (
      <div className="container">

        <Header
          post="true"
          logged={this.props.logged}
          editing={this.props.editing}
          creating={this.props.creating}
          create={()=>this.props.dispatch(posts.createPost(this.refs.postTitle.state.title, '{}', convertToRaw(this.refs.content.state.editorState.getCurrentContent())))}
          edit={()=>this.props.dispatch(posts.editingPost(true))}
          delete={()=>this.props.dispatch(posts.deletePost(this.props.params.postUrl))}
          save={()=>this.props.dispatch(posts.updatePost(this.props.params.postUrl, this.refs.postTitle.state.title, '{}', convertToRaw(this.refs.content.state.editorState.getCurrentContent())))}
        />

        {this.renderPageContent()}

      </div>
    )
  }
}

export default Post
