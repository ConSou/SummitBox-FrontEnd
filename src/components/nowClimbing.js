import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timer from './timer'
import NavBar from './navbar';

class NowClimbing extends Component {
  constructor(props){
    super(props)

    this.state = {
      yourLocal: null,
      boxAccess: false,
      summitConfirm: false
    }
  }

  componentDidMount(){
    console.log(this.props.location.state.mountian)
  }


  confirmSummit(){
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({yourLocation: position})
        console.log(this.state.yourLocation)
        this.summitSuccess()
      })
    }

  summitSuccess(){
    const yourLat = Math.round(this.state.yourLocation.coords.latitude * 1000) / 1000
    const yourLng = Math.round(this.state.yourLocation.coords.longitude * 1000) / 1000

    const mtLat = Math.round(this.props.location.state.mountian.lat * 1000) / 1000
    const mtLng = Math.round(this.props.location.state.mountian.lng * 1000) / 1000

    if(yourLat === mtLat && yourLng === mtLng){
      this.setState({boxAccess: true})
    }
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
        <button onClick={() => this.confirmSummit()}>
          Confirm Summit
        </button>
        <p> {this.state.yourLocation ? this.state.yourLocation.coords.latitude : ""} </p>
        <p> {this.state.yourLocation ? this.state.yourLocation.coords.longitude : ""} </p>
        <h1> {this.state.boxAccess ? <Link to='/'>You Have Reached the SummitBox </Link> : ""} </h1>
        <Timer boxAccess={this.state.summitConfirm}/>
        <NavBar />
      </div>
    );
  }
}

export default NowClimbing;
