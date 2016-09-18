import React from 'react'

class PostTitle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      editing: false
    }
  }

  componentWillMount() {
    this.setState({title: this.props.initialTitle, loading: false});
  }

  componentWillReceiveProps(newProps) {
    this.setState({title: newProps.initialTitle, loading: false});
  }

  render() {
    if (this.props.editing) {
      return (
        <div className="title">
          <input className="title-input" type="text" value={this.state.title} onChange={(e)=>this.setState({title: e.target.value})} placeholder="Title"></input>
        </div>
      )
    } else {
      return (
        <h1 className="title">{this.state.title}</h1>
      )
    }
  }
}

export default PostTitle
