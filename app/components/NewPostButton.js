import React from 'react';
import { Link } from 'react-router';

const NewPostButton = (props) => {
  return (
    <Link id="new-post" to="/create-post"><div className="button"><i className="text fa fa-plus"></i></div></Link>
  )
}

export default NewPostButton;
