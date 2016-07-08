import React from 'react';
import { Link } from 'react-router'
import axios from 'axios';

import ProjectCard from './ProjectCard'

class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    axios.get('api/main').then(data => {
      this.setState({posts: data.data});
    }).catch(error => console.log(error));
  }

  render() {

    return (
      <main id="projects">
        {this.state.posts.map((project, key) =>
          <ProjectCard
            key={key}
            title={project.title}
            color={project.meta.color}
            url={project.url}
            image={project.meta.image}
          />)}
      </main>
    )
  }
}

export default PostsList
