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

addPlan = (e) => {
  console.log(this.state.searchResult[0].id)

  window.fetch('v1/plans/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': localStorage.getItem('token'),
      'X-User-Email': localStorage.getItem('email')
    },
    body: JSON.stringify({
      mountian_id: this.state.searchResult[0].id
    })
  })
    .then(response => response.json())
    .then(json => console.log(json.data))
}

  render() {
    return (
      <div className="searchView">
        <h1> Explore. </h1>
          <form id="searcher" onSubmit={this.onSearch}>
            <input className='form-group' type='search' ref={node => {this.mountain = node}}placeholder='Search SummitBoxes' />
            <button> Search </button>
          </form>
        <div>
          {this.state.searchResult ?
            <div className="resultBox">
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
                <p>
                {this.state.searchResult[0].image}
                </p>
                <button onClick={this.addPlan}>
                  Add to Planning
                </button>
             </div> : "Search by Mountian Name Above!"}
        </div>
        < NavBar />
      </div>
    );
  }
}

export default Search;
//<img src={require(`${this.state.searchResult[0].image}`)} />
