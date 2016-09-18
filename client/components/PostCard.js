import React from 'react'
import { Link } from 'react-router'

const PostCard = (props) => {
  return (
    <article className="post">
      <Link className="post-link" to={'/post/' + props.url}>
        <div className="image-container">
          <img src={props.image}/>
        </div>
        <div className="content">
          <h2 className="title">{props.title}</h2>
          <p className="description">{props.description}</p>
        </div>
      </Link>
      <div className="meta">
        <p>Posted by <Link to={'/user/' + props.creator}>{props.creator}</Link> on <strong>{props.date}</strong></p>
      </div>
    </article>
  )
}

export default PostCard
