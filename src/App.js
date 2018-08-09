import React, { Component } from 'react';
import New from './New';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      mountians: []
    }
  }
  componentDidMount(){
    window.fetch('/v1/mountians')
    .then(response => response.json())
    .then(json => {
      console.log(json.data)
      this.setState({
        mountians: json.data
      })
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to SummitBox</h2>
          <New />
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
