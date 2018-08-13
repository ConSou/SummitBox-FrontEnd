import React, { Component } from 'react';
import New from './New';
import SignUp from './Signup'
import Info from './info'
import { Route, Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className='page-header'>
      <img class='bg-image' src={require('../images/Landing3.jpg')} height='100%' width='100%' />
        <header>
            <h2 className="title-dark">SummitBox</h2>
        </header>
        <main className='nav'>

          <Link to='/signin' className='linx'>
          <button className='btn btn-primary'>
            Send It
          </button>
          </Link>

          <Link to='/info' className='info'> i </Link>

        </main>
      </div>
    );
  }
}

export default Landing;
