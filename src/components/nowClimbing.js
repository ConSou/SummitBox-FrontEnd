import React, { Component } from 'react';
import NavBar from './navbar';

class NowClimbing extends Component {

  componentDidMount(){
    console.log(this.props.location.state.mountian)
  }

  render() {
    return (
      <div>
        <h1> Now Climbing {this.props.location.state.mountian.name}. </h1>
        <p>
          Lat: {this.props.location.state.mountian.lat} |
          Long: {this.props.location.state.mountian.lng}
        </p>
        <p>
          Elevation: {this.props.location.state.mountian.elevation} ft.
        </p>
        <button>
          Confirm Summit
        </button>
        <NavBar />
      </div>
    );
  }
}

export default NowClimbing;
