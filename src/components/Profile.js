import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from './navbar';


class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      signedIn: false,
      userFirstName: null,
      userLastName: null,
      userCity: null,
      userState: null,
      userCountry: null,
      userBio: null,
      profilePic: null,
      displayPic: null
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
          this.setState({
            userFirstName: json.data.user.first_name,
            userLastName: json.data.user.last_name,
            userCity: json.data.user.city,
            userState: json.data.user.state,
            userCountry: json.data.user.country,
            userBio: json.data.user.bio,
            displayPic: json.data.user.imgurl
          })
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

  // fileSelectedHandler = (e) => {
  //   console.log(e.target.files[0])
  //   this.setState({ profilePic: e.target.files[0]})
  // }

  // uploader = (e) => {
  //   console.log('Working Upload')
  //
  //   const image = this.state.profilePic
  //   console.log(image)
  //
  //   const formData = new FormData()
  //   formData.append('image', image)
  //
  //   let id = localStorage.getItem('id')
  //   window.fetch(`/v1/users/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'X-User-Token': localStorage.getItem('token'),
  //       'X-User-Email': localStorage.getItem('email')
  //     },
  //     body: formData
  //   })
  //   .then(response => response.json())
  //   .then(json => console.log(json.data.user.image))
  // }

  onEdit = () => {
    console.log("hello")
  }

  render() {
    if(!this.state.signedIn){
      return (
        <Redirect to='/signin' />
      )
    }else{
    return (
      <div className="App">
      <div>
          <h1>
            {this.state.userFirstName} {this.state.userLastName}
            <Link to={{
              pathname: '/edit',
              state: {
                userFirstName: this.state.userFirstName,
                userLastName: this.state.userLastName,
                userCity: this.state.userCity,
                userState: this.state.userState,
                userCountry: this.state.userCountry,
                userBio: this.state.userBio,
                profilePic: this.state.profilePic,
                displayPic: this.state.displayPic
              }
            }}> Edit </Link>
          </h1>
          <p> {this.state.userCity} | {this.state.userState} | {this.state.userCountry} </p>
          <img alt="country flag" src="https://www.countryflags.io/us/flat/64.png" />
      </div>
          <div>
            <img alt="profile" src={this.state.displayPic} height='100px' width='100px' />
          </div>
        <div>
          {this.state.userBio}
        </div>
        <button onClick={this.signOut}>
          Sign Out
        </button>
        <div>
          < NavBar />
        </div>
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
