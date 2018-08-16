import React, { Component } from 'react';

class SignUp extends Component {

  submitForm = (e) => {
    e.preventDefault()

    let email = this.email.value
    let password = this.password.value
    let passwordConfirmation = this.passwordConfirm.value
    let firstName = this.firstName.value
    let lastName = this.lastName.value

    window.fetch('v1/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        first_name: firstName,
        last_name: lastName
        }
      })
    })
    .then(response => response.json())
    .then(json =>
    console.log(json.data)
  )
  }

  render() {
    return (
      <div className='page-header'>
      <img className='bg-image' alt='mountian top' src={require('../images/Signup2.jpg')} height='100%' width='100%' />
        <header>
            <h2 className='title'>Welcome.</h2>
        </header>
        <main className='nav'>
        <div className='form-group'>
        <form id='sign-up-form' onSubmit={this.submitForm}>
            <input className ='form-control' type='name' ref={node => {this.firstName = node;}} placeholder='First Name' />
            <input className ='form-control' type='name' ref={node => {this.lastName = node;}} placeholder='Last Name' />
            <input className ='form-control' type='email' ref={node => {this.email = node;}} placeholder='Email' />
            <input className ='form-control' type='password' ref={node => {this.password = node;}} placeholder='Password' />
            <input className ='form-control' type='password' ref={node => {this.passwordConfirm = node;}} placeholder='Confirm Password' />
          <button>
            Sign Up
          </button>
        </form>
        </div>
        </main>
      </div>
    );
  }
}

export default SignUp;
