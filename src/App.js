import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      mountians: []
    }
  }
  componentDidMount(){
    window.fetch('/api/mountians')
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        mountians: json
      })
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <h1 className="App-intro">
            {this.state.mountians.map( mountian =>
              <p key={mountian.id}>{mountian.name}</p>
            )}
          </h1>
      </div>
    );
  }
}

export default App;
