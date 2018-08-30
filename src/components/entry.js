import React, { Component } from 'react';

class Entry extends Component {
  constructor(props){
    super(props)

    this.state = {
      userFirstName: null,
      userLastName: null,
      userCity: null,
      userState: null,
      userCountry: null,
      displayPic: null
    }
  }

  componentDidMount(){
    let id = localStorage.getItem('id');
    window.fetch(`v1/users/${id}`, {
      method: 'GET',
      headers: {
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      }})
      .then(response => response.json())
      .then(json => {
          console.log(json.data)
          this.setState({
            userFirstName: json.data.user.first_name,
            userLastName: json.data.user.last_name,
            userCity: json.data.user.city,
            userState: json.data.user.state,
            userCountry: json.data.user.country,
            displayPic: json.data.user.imgurl
          })
        })
  }

  postBoxEntry = (e) => {
    e.preventDefault()

    console.log("Submit")
    let journal = this.userJournal.value

    window.fetch('v1/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      },
      body: JSON.stringify({
        bin_id: this.props.location.state.bin_id,
      	name: this.state.userFirstName,
      	city: this.state.userCity,
      	state: this.state.userState,
      	country: this.state.userCountry,
      	journal: journal
      })
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }

  render() {
    return (
      <div>
      <h1> Hello {this.state.userFirstName}, </h1>
        <p> Welcome to {this.props.location.state.bin_name} SummitBox. </p>
        <form onSubmit={this.postBoxEntry}>
          <label>
            Journal:
            <textarea className='form-control' type='text' ref={node => {this.userJournal = node;}} placeholder="Journal Entry" />
          </label>
          <button>
            Save SummitBox Entry
          </button>
        </form>
      </div>
    );
  }
}

export default Entry;

// <label>
//   Name:
//   <input className='form-control' type='name' ref={node => {this.firstName = node;}} defaultValue={this.state.userFirstName} />
// </label>
// <label>
//   City:
//   <input className='form-control' type='name' ref={node => {this.userCity = node;}} defaultValue={this.state.userCity} />
// </label>
// <label>
//   State:
//   <input className='form-control' type='name' ref={node => {this.userState = node;}} defaultValue={this.state.userState} />
// </label>
// <label>
//   Country:
//   <input className='form-control' type='name' ref={node => {this.userCountry = node;}} defaultValue={this.state.userCountry} />
// </label>
// <label>
