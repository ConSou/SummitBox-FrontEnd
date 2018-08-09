import React from 'react';


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
    })
    document.getElementById('sign-in-form').reset();
  }

  render(){
    return(
      <form id='sign-in-form' onSubmit={this.submitForm}>
        <label> Email </label>
          <input type='email' ref={node => {this.email = node;}} placeholder='Enter email' />
        <label> Password </label>
          <input type='password' ref={node => {this.password = node;}} placeholder='Enter password' />
        <button>
          Sign In
        </button>
      </form>
    );
  }
}

export default New;
