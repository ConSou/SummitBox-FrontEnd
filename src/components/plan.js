import React, { Component } from 'react';
import NavBar from './navbar';

class Plan extends Component {
  constructor(props){
    super(props)

    this.state = {
      myPlans: [],
      myPlanMount: []
    }
  }

  componentDidMount(){
    window.fetch('/v1/plans/', {
      method: 'GET',
      headers: {
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      }})
      .then(response => response.json())
      .then(json => {
        console.log(json.data)
        this.setState({ myPlans: json.data})
        this.getMountians()
      })
  }

  getMountians(){
    console.log('got em')
    window.fetch('/v1/mountians/', {
      method: 'GET',
      headers: {
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      }})
      .then(response => response.json())
      .then(json => {
        console.log(json.data)
      })
  }

  render() {
    return (
      <div>
        <h1> Plan. </h1>
        <div>
        {this.state.myPlans.map((item, key) => {
          return(
            <div key={key}>
              {item.mountian_id}
            </div>
            )
          }
        )}
        </div>
        < NavBar />
      </div>
    );
  }
}

export default Plan;
