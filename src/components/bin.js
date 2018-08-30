import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    window.fetch(`/v1/entries/${this.props.location.state.boxId}`, {
      method: 'GET',
      headers: {
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({ posts: json.data })
    })
  }

  render() {
    return (
      <div>
        <h1> {this.state.bin.name} SummitBox </h1>
        <div>
            {this.state.posts.map((item, key) => {
              return(
                <div className="boxPosts" key={key}>
                  <p> {item.name} </p>
                  <p> {item.journal} </p>
                </div>
              )
            }
          )}
        </div>
        <Link to="/entry">

        </Link>
        <Link to={{
          pathname: '/entry',
          state: {
            bin_id: this.state.bin.id,
            bin_name: this.state.bin.name
          }
        }}> Create Box Entry </Link>
      </div>
    );
  }
}

export default Bin;
