import React from 'react';
import { Link } from 'react-router'

class ProjectCard extends React.Component {

  render() {
    let className = 'project ';
    if (this.props.color) {
      className += this.props.color;
    }

    return (
      <article className={className}>
        <Link to={`/projects/${this.props.url}`} className="info">
          <h2 className="title">{this.props.title}</h2>
        </Link>
        <img className="cover-image" src={this.props.image} alt={this.props.title} />
      </article>
    )
  }
}

export default ProjectCard
