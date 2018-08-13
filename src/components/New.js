import React from 'react';
import { Route, Link } from 'react-router-dom';
import SignUp from './Signup'


class New extends React.Component{

  submitForm = (e) => {
    e.preventDefault()

    let email = this.email.value
    let password = this.password.value

    window.fetch('v1/sessions/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json.data)
      localStorage.setItem('token', json.data.user.authentication_token);
      localStorage.setItem('email', json.data.user.email);
    })
    .catch(error => console.log(error))

    document.getElementById('sign-in-form').reset();
  }

  render(){
    return(
      <div className='page-header'>
      <img class='bg-image' src={require('../images/Signin.jpg')} height='100%' width='100%' />
        <header>
            <h2 className='title-dark'>SummitBox</h2>
        </header>
        <main className='nav'>
          <form id='sign-in-form' onSubmit={this.submitForm}>
            <div className='form-group'>
              <input className ='form-control' type='email' ref={node => {this.email = node;}} placeholder='Enter email' />
              <input className ='form-control' type='password' ref={node => {this.password = node;}} placeholder='Enter password' />
            <button>
              Sign In
            </button>
            <div>
            <div>
                or
            </div>
            <Link to='/signup' className='sign-up'> Sign Up </Link>
            </div>
            </div>
          </form>
          </main>
      </div>
    );
  }
}

export default New;
