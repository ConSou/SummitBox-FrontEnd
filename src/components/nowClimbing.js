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
    const yourLat = Math.round(this.state.yourLocation.coords.latitude * 10) / 10
    const yourLng = Math.round(this.state.yourLocation.coords.longitude * 10) / 10
    console.log(yourLat)
    console.log(yourLng)

    const mtLat = Math.round(this.props.location.state.mountian.lat * 10) / 10
    const mtLng = Math.round(this.props.location.state.mountian.lng * 10) / 10
    console.log(mtLat)
    console.log(mtLng)

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
        <h1> {this.state.boxAccess ? <Link to={{
          pathname: '/boxaccess',
          state: {boxId: this.props.location.state.mountian.id}
        }}>You Have Reached the SummitBox </Link> : ""} </h1>
        <Timer boxAccess={this.state.summitConfirm}/>
        <NavBar />
      </div>
    );
  }
}

export default NowClimbing;
