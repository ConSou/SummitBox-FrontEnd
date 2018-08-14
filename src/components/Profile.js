import React, { Component } from 'react';

class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      mountians: []
    }
  }
  componentDidMount(){
    window.fetch('/v1/mountians', {
    method: 'GET',
    headers: {
      'X-User-Token': localStorage.getItem('token'),
      'X-User-Email': localStorage.getItem('email')
    }})
    .then(response => response.json())
    .then(json => {
      console.log(json.data)
      this.setState({
        mountians: json.data
      })
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="App">
          <h1> Hello </h1>
          <p>{this.props.userEmail}</p>
          <h1 className="App-intro">
            {this.state.mountians.map( mountian =>
              <p key={mountian.id}>{mountian.name}</p>
            )}
          </h1>
      </div>
    );
  }
}

export default Profile;
