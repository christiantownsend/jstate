import React from 'react';
import { Link } from 'react-router';
import { convertToRaw } from 'draft-js';
import axios from 'axios';

import PostTitle from '../components/PostTitle.js'
import RichEditor from '../components/RichEditor.js'

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      creating: false,
    };

    this.toggleEditing = () => {
      this.setState({editing: true})
    };

    this.updatePost = () => {
      if (!this.refs.title.state.title) { return; }
      axios.post('/api/update-post/' + this.props.params.postUrl, {
        title: this.refs.title.state.title,
        content: convertToRaw(this.refs.content.state.editorState.getCurrentContent()),
        meta: {
          image: '/static/img/cover-images/mountain.jpg',
          color: 'blue'
        }
      }).then(response => {
        this.setState({editing: false})
      }).catch(error => console.log(error));
    };

    this.createPost = () => {
      if (!this.refs.title.state.title) {
        return;
      }

      axios.post('/api/create-post', {
        title: this.refs.title.state.title,
        content: convertToRaw(this.refs.content.state.editorState.getCurrentContent()),
        meta: {
          image: '/static/img/cover-images/mountain.jpg',
          color: 'blue'
        }
      }).then(response => {
        this.props.history.push(`/projects/${response.data}`)
        this.setState({creating: false, editing: false})
      }).catch(error => console.log(error));
    }

    this.deletePost = () => {
      axios.get('/api/delete-post/' + this.props.params.postUrl).then((response) => {
        this.props.history.push('/')
      })
    };
  }

  componentDidMount() {
    axios.post('/api/login', {
      name: 'admin',
      password: 'admin'
    }).then(response => console.log(response)).catch(error => console.log(error))
    if (this.props.location.pathname == '/create-post') {
      this.setState({creating: 'true', editing: 'true'})
    }
  }

  render() {

    let functionButtons;
    if (this.state.editing && this.state.creating) {
      functionButtons = (
        <div className="functions">
          <button onClick={this.createPost}>Post</button>
        </div>
      )
    }
    else if (this.state.editing && !this.state.creating) {
      functionButtons = (
        <div className="functions">
          <button onClick={this.updatePost}>Save</button>
          <button onClick={this.deletePost}>Delete</button>
        </div>
      )
    }
    else {
      functionButtons = (
        <div className="functions">
          <button onClick={this.toggleEditing}>Edit</button>
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      )
    }


    return (
      <div id="post">
        <header className="header">
          <div className="buttons">
            <Link to="/">Back</Link>
            {functionButtons}
          </div>

          <PostTitle Url={this.props.location.pathname} postUrl={this.props.params.postUrl} ref="title" editing={this.state.editing} />

        </header>
        <main className="container">
            <RichEditor Url={this.props.location.pathname} postUrl={this.props.params.postUrl} ref="content" editing={this.state.editing} />
        </main>
      </div>
    )
  }
}

export default Post;
