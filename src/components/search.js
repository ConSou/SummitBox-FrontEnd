import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar';

class Search extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchResult: null,
      serverRes: 0,
      isPlanned: false
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
    this.setState({ isPlanned: true })
}

  render() {
    return (
      <div className="searchView">
        <h1 className="jumbotron"> Explore. </h1>
          <form id="searcher" onSubmit={this.onSearch}>
            <input className='form-group' type='search' ref={node => {this.mountain = node}}placeholder='Search SummitBoxes' />
            <button> Search </button>
          </form>
        <div>
          {this.state.searchResult ?
            <div className="resultBox">
              <h3>
               {this.state.searchResult[0].name}
               </h3>
               <div>
                 <img className='mountianImg' alt='mountian top' src={require(`../images/mountianImg/${this.state.searchResult[0].image}`)} height='300px' width='300px'/>
               </div>
               <p>
                  Latitude: {this.state.searchResult[0].lat}
                  </p>
                  <p>
                  Longitude: {this.state.searchResult[0].lng}
                 </p>
               <p>
                Elevation: {this.state.searchResult[0].elevation}
                </p>
                <p className="planningButton" onClick={this.addPlan}>{this.state.isPlanned ? "Added!" : "Add to Planning" }</p>
                <Link to={{
                  pathname: '/nowclimbing',
                  state: {mountian: this.state.searchResult[0]}
                }}> Start Climb </Link>
             </div> : "Search by Mountian Name Above!"}
        </div>
        < NavBar />
      </div>
    );
  }
}

export default Search;

// <div>
//   {this.state.searchResult ?
//     <div className="resultBox">
//       <h3>
//        {this.state.searchResult[0].name}
//        </h3>
//         <p>
//         Latitude: {this.state.searchResult[0].lat}
//         </p>
//         <p>
//         Longitude: {this.state.searchResult[0].lng}
//         </p>
//         <p>
//         Elevation: {this.state.searchResult[0].elevation}
//         </p>
//         <div>
//           <img alt='mountian top' src={require(`../images/mountianImg/${this.state.searchResult[0].image}`)} height='200px' width='200px'/>
//         </div>
//         <p onClick={this.addPlan}> Add </p>
//         <Link to={{
//           pathname: '/nowclimbing',
//           state: {mountian: this.state.searchResult[0]}
//         }}> Start Climb </Link>
//      </div> : "Search by Mountian Name Above!"}
// </div>
