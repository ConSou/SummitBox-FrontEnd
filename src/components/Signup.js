import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <div className='page-header'>
      <img className='bg-image' alt='mountian top' src={require('../images/Signup2.jpg')} height='100%' width='100%' />
        <header>
            <h2 className='title'>Welcome.</h2>
        </header>
        <main className='nav'>
        <div className='form-group'>
        <form id='sign-up-form'>
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
