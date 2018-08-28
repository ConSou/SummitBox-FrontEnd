import React, { Component } from 'react';
import New from './components/New';
import SignUp from './components/Signup';
import Info from './components/info';
import Profile from './components/Profile';
import Landing from './components/Landing';
import Search from './components/search';
import Plan from './components/plan';
import Bin from './components/bin';
import NowClimbing from './components/nowClimbing';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  // constructor(props){
  //   super(props)
  //
  //   this.state = {
  //     mountians: []
  //   }
  // }
  // componentDidMount(){
  //   window.fetch('/v1/mountians')
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json.data)
  //     this.setState({
  //       mountians: json.data
  //     })
  //   })
  //   .catch(error => console.log(error))
  // }
  render() {
    return (
      <div className="App">
          <Route path='/signin' component={New} />
          <Route exact path='/' component={Landing} />
          <Route path='/signup' component={SignUp} />
          <Route path='/info' component={Info} />
          <Route path='/profile' component={Profile} />
          <Route path='/search' component={Search} />
          <Route path='/plan' component={Plan} />
          <Route path='/nowclimbing' component={NowClimbing} />
          <Route path='/boxaccess' component={Bin} />
      </div>
    );
  }
}

export default App;


//<New />

// <h1 className="App-intro">
//   {this.state.mountians.map( mountian =>
//     <p key={mountian.id}>{mountian.name}</p>
//   )}
// </h1>
