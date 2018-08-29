import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ProfileEdit extends Component {

submitForm = (e) => {
  e.preventDefault()

  let firstName = this.firstName.value
  let lastName = this.lastName.value
  let userCity = this.userCity.value
  let userState = this.userState.value
  let userCountry = this.userCountry.value
  let userBio = this.userBio.value


  let id = localStorage.getItem('id')
  window.fetch(`/v1/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': localStorage.getItem('token'),
      'X-User-Email': localStorage.getItem('email')
    },
    body: JSON.stringify({
      user: {
        first_name: `${firstName}`,
        last_name: `${lastName}`,
        city: `${userCity}`,
        state: `${userState}`,
        country: `${userCountry}`,
        bio: `${userBio}`
      }
    })
  })
  .then(response => console.log(response))
  //.then(json => console.log(json.data.user))
  this.props.history.push('/profile');
}

fileSelectedHandler = (e) => {
  console.log(e.target.files[0])
  var pic = e.target.files[0]


  const image = new FormData()
  image.append('image', pic)
  console.log(image)

  let id = localStorage.getItem('id')
  window.fetch(`/v1/users/${id}`, {
    method: 'PUT',
    headers: {
      //'Content-Type': 'application/json',
      'X-User-Token': localStorage.getItem('token'),
      'X-User-Email': localStorage.getItem('email')
    },
    body: image
  })
  .then(response => response.json())
  .then(json => console.log(json.data.user.image))

}

  render() {
    return (
      <div className="App">
        <div className='form-group'>
            <form id='sign-up-form' onSubmit={this.submitForm}>
              <label>
                First Name:
                <input className='form-control' type='name' ref={node => {this.firstName = node;}} defaultValue={this.props.location.state.userFirstName} />
              </label>
              <label>
                Last Name:
                <input className='form-control' type='name' ref={node => {this.lastName = node;}} defaultValue={this.props.location.state.userLastName} />
              </label>
              <label>
                City:
                <input className='form-control' type='name' ref={node => {this.userCity = node;}} defaultValue={this.props.location.state.userCity} />
              </label>
              <label>
                State:
                <input className='form-control' type='name' ref={node => {this.userState = node;}} defaultValue={this.props.location.state.userState} />
              </label>
              <label>
                Country:
                <input className='form-control' type='name' ref={node => {this.userCountry = node;}} defaultValue={this.props.location.state.userCountry} />
              </label>
              <label>
                Bio:
                <textarea className='form-control' type='text' ref={node => {this.userBio = node;}} defaultValue={this.props.location.state.userBio} />
              </label>
              <label>
                Profile Picture:
                <input className='form-control' type='file' onChange={this.fileSelectedHandler} />
              </label>
              <button>
                Save Changes
              </button>
            </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileEdit);

// fileSelectedHandler = (e) => {
//   console.log(e.target.files[0])
//   const image = e.target.files[0]
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
//
// }
