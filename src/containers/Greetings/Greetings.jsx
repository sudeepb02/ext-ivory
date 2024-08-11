import React, { Component } from 'react';
import icon from '../../assets/img/shield.png';

class GreetingComponent extends Component {
  state = {
    name: 'Deepali',
  };

  render() {
    return (
      <div>
        <p>Hello, {this.state.name}!</p>
        {/* <img src={icon} alt="extension icon" /> */}
      </div>
    );
  }
}

export default GreetingComponent;
