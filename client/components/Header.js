import React from 'react'
import { Link, IndexLink } from 'react-router'

const Header = (props) => {

  let nav;
  if (props.logged) {

    if (props.post) {
      if (props.editing && props.creating) {
        nav = (
          <nav className="nav">
            <IndexLink className="nav-item" activeClassName="active" to="/">Home</IndexLink>
            <Link className="nav-item" activeClassName="active" to="about">About</Link>
            <span className="divider">|</span>
            <Link className="nav-item" to="/" onClick={props.create}>Post</Link>
          </nav>
        )
      } else if (props.editing && !props.creating) {
        nav = (
          <nav className="nav">
            <IndexLink className="nav-item" activeClassName="active" to="/">Home</IndexLink>
            <Link className="nav-item" activeClassName="active" to="about">About</Link>
            <span className="divider">|</span>
            <button className="nav-item" onClick={props.save}>Save Post</button>
            <Link to="/" className="nav-item" onClick={props.delete}>Delete Post</Link>
          </nav>
        )
      } else {
        nav = (
          <nav className="nav">
            <IndexLink className="nav-item" activeClassName="active" to="/">Home</IndexLink>
            <Link className="nav-item" activeClassName="active" to="about">About</Link>
            <span className="divider">|</span>
            <button className="nav-item" onClick={props.edit}>Edit Post</button>
            <Link to="/" className="nav-item" onClick={props.delete}>Delete Post</Link>
          </nav>
        )
      }
    } else {
      nav = (
        <nav className="nav">
          <IndexLink className="nav-item" activeClassName="active" to="/">Home</IndexLink>
          <Link className="nav-item" activeClassName="active" to="about">About</Link>
          <span className="divider">|</span>
          <Link className="nav-item" to="/new-post">New Post</Link>
        </nav>
      )
    }

  } else {
    nav = (
      <nav className="nav">
        <IndexLink className="nav-item" activeClassName="active" to="/">Home</IndexLink>
        <Link className="nav-item" activeClassName="active" to="about">About</Link>
      </nav>
    )
  }

  return (
    <header className="header">
      <Link className="title" to="/"><h1>Redux Blog</h1></Link>
      {nav}
    </header>
  )
}

export default Header
