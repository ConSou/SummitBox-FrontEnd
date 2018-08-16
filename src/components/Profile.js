import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      signedIn: false,
      userFirstName: null,
      userLastName: null,
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

  componentWillMount(){
    this.setState({signedIn: true})
    let id = localStorage.getItem('id');
    if(id){
    window.fetch(`v1/users/${id}`, {
      method: 'GET',
      headers: {
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      }})
      .then(response => response.json())
      .then(json => {
          console.log(json.data)
          this.setState({ userFirstName: json.data.user.first_name, userLastName: json.data.user.last_name})
        })
      }else{
        this.setState({signedIn: false})
      }
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
    localStorage.removeItem('id')
    this.setState({ signedIn: false })
  }

  render() {
    if(!this.state.signedIn){
      return (
        <Redirect to='/signin' />
      )
    }else{
    return (
      <div className="App">
          <h1> Hello </h1>
          <h1> {this.state.userFirstName} {this.state.userLastName}  </h1>
          <p>
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
