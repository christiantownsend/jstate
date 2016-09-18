import React from 'react'
import {Entity} from 'draft-js'

const LinkEntity = (props) => {
  return <a href={Entity.get(props.entityKey).getData().href}>{props.children}</a>
}

export default LinkEntity
