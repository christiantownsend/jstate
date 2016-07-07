import React from 'react';
import axios from 'axios'

class PostTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    }

    this.updateTitle = (e) => this.setState({title: e.target.value})
  }

  componentWillMount() {
    if (this.props.Url != '/create-post'){
      axios.get('/api/get-post/' + this.props.postUrl + '/1').then((data) => {
        this.setState({title: data.data.title})
      }).catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div>
        { this.props.editing
          ? <input className="title" type="text" placeholder="New Post" onChange={this.updateTitle} value={this.state.title}></input>
          : <h1 className="title">{this.state.title}</h1>
        }
      </div>
    )
  }
}

export default PostTitle
