import React, { Component } from 'react';

class Bin extends Component {
  constructor(props){
    super(props)

    this.state = {
      bin: [],
      posts: []
    }
  }

  componentDidMount(){
    window.fetch(`/v1/bins/${this.props.location.state.boxId}`, {
      method: 'GET',
      headers: {
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({ bin: json.data[0] })
    })
  }

  render() {
    return (
      <h1> {this.state.bin.name} SummitBox </h1>
    );
  }
}

export default Bin;
