import React from 'react'

const styles = {
  "position": "absolute",
  "bottom": "2em",
  "right": "2em",
  "width": 200
}

const Loader = (props) => {
  return (
    <img
      style={styles}
      src="http://24.media.tumblr.com/8210fd413c5ce209678ef82d65731443/tumblr_mjphnqLpNy1s5jjtzo1_400.gif"
    ></img>
  )
}

export default Loader
