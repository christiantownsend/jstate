import React from 'react';
import { Link } from 'react-router'
import axios from 'axios';
import _ from 'lodash';

import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'Mountain Background Art',
    color: 'blue',
    url: 'mountain-background-art',
    image: '/static/img/cover-images/mountain.jpg'
  },
  {
    title: 'Space Crystal',
    color: 'red',
    url: 'space-crystal',
    image: '/static/img/cover-images/crystal.jpg'
  },
  {
    title: 'Low-poly Art',
    color: 'orange',
    url: 'low-poly-art',
    image: '/static/img/cover-images/mountain.jpg'
  }
]

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

        <Link to="/create-post" id="new-post"><h3>Create New Post</h3></Link>
      </main>
    )
  }
}

export default PostsList
