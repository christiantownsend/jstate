import React from 'react';

class StyleButton extends React.Component {
  constructor() {
    super()

    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    }
  }

  render() {
    let className = 'style-button';
    if (this.props.active) {
      className += ' active'
    }

    return (
      <button className={className} onClick={this.onToggle}>{this.props.label}</button>
    );
  }
}

export default StyleButton;
