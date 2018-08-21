import React, { Component } from 'react';
import NavBar from './navbar';

class Search extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchResult: null,
      serverRes: 0
    }

  }

onSearch = (e) => {
  e.preventDefault()
  let mountianSearch = this.mountain.value;
  console.log(mountianSearch)
  document.getElementById('searcher').reset();


  window.fetch(`/v1/mountians/${mountianSearch}`, {
    method: 'GET',
    headers: {
      'X-User-Token': localStorage.getItem('token'),
      'X-User-Email': localStorage.getItem('email')
    }})
    .then(response => response.json()
    .then(this.setState({serverRes: response.status})))
    .then(json => {
        console.log(json)
        if(this.state.serverRes === 200){
        this.setState({ searchResult: json })
      }
      })
    .catch(error => console.log(error))

}

  render() {
    return (
      <div>
        Search!
        <div>
          <form id="searcher" onSubmit={this.onSearch}>
            <input className='form-group' type='search' ref={node => {this.mountain = node}}placeholder='Search SummitBoxes by Peak Name' />
            <button> Search </button>
          </form>
        </div>
        <div>
          {this.state.searchResult ? <div>
            <h1>
             {this.state.searchResult[0].name}
             </h1>
             <p>
              {this.state.searchResult[0].description}
              </p>
              <p>
              Latitude: {this.state.searchResult[0].lat}
              </p>
              <p>
              Longitude: {this.state.searchResult[0].lng}
              </p>
              <p>
              Elevation: {this.state.searchResult[0].elevation}
              </p>
             </div> : "Null"}
        </div>
        < NavBar />
      </div>
    );
  }
}

export default Search;
