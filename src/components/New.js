import React from 'react';
import { Link, Redirect } from 'react-router-dom';


class New extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      signedIn: false,
      userId: 0
    }
  }

  componentDidMount(){

      let authentication_token = localStorage.getItem('token')
      let email = localStorage.getItem('email')

      if(email && authentication_token){
        this.signInFromStorage()
      }
  }

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
      localStorage.setItem('id', json.data.user.id);
      this.setState({ signedIn: true, userId: json.data.user.id})
    })
    .catch(error => console.log(error))

    document.getElementById('sign-in-form').reset();
  }

  signInFromStorage(){
    this.setState({ signedIn: true })
  }

  render(){
    if(this.state.signedIn){
      return (
            <Redirect to = {{
                pathname: '/profile'
            }}/> )
    }else{
    return(
      <div className='page-header'>
      <img className='bg-image' alt='mountian top' src={require('../images/Signin.jpg')} height='100%' width='100%' />
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
}

export default New;
