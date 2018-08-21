import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div className="navie">
        <Link to='/search'> Search |</Link>
        <Link to='/plan'> Plan |</Link>
        <Link to='/profile'> My Profile </Link>
      </div>
    );
  }
}

export default NavBar;
