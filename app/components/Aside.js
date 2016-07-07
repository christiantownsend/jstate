import React from 'react'

const Aside = (props) => {
  return (
    <aside id="me">
      <h1 className="name">Christian Townsend</h1>
      <hr />
      <p className="about">Hi, I'm a high school student with a passion for creating things. I'm interested in all fields of design, and I'd like to pursue a career in graphic design, specifically focusing on user interface and interaction. I hope you enjoy viewing my work as much as I enjoyed creating it!</p>
      <section className="contact">
        <h3>Find me here:</h3>

        <a href="mailto:christianttownsend@gmail.com">email</a>
        <a href="https://github.com/christiantownsend">github</a>
        <a href="https://dribbble.com/christiantownsend">dribbble</a>

      </section>
    </aside>
  )
}

export default Aside;
