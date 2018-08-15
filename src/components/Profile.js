import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      signedIn: this.props.location.state.signedIn
    }
    this.signOut = this.signOut.bind(this);
  //
  //   this.state = {
  //     mountians: []
  //   }
  // }
  // componentWillMount(){
  //   window.fetch('/v1/mountians', {
  //   method: 'GET',
  //   headers: {
  //     'X-User-Token': localStorage.getItem('token'),
  //     'X-User-Email': localStorage.getItem('email')
  //   }})
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json.data)
  //     this.setState({
  //       mountians: json.data
  //     })
  //   })
  //   .catch(error => console.log(error))
  }
  signOut(){

    window.fetch('v1/sessions/', {
      method: 'DELETE',
      headers: {
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      }
    })
    .then(response => console.log(response))

    localStorage.removeItem('email')
    localStorage.removeItem('token')
    this.setState({ signedIn: false })
  }

  render() {
    if(!this.state.signedIn){
      return (
        <Redirect to='/' />
      )
    }else{
    return (
      <div className="App">
          <h1> Hello </h1>
          <h1> {this.props.location.state.signedIn} </h1>
          <p>
            {this.props.location.state.userEmail}
            <button onClick={this.signOut}>
              Sign Out
            </button>
          </p>
          <input type='file' />
      </div>
    );
  }
}
}

export default Profile;

// <h1 className="App-intro">
//   {this.state.mountians.map( mountian =>
//     <p key={mountian.id}>{mountian.name}</p>
//   )}
// </h1>
