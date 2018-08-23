import React, { Component } from 'react';
import NavBar from './navbar';
import { Link } from 'react-router-dom';

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
        this.setState({ myPlans: json.data})
        console.log(this.state.myPlans)
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
        this.state.myPlans.forEach((item) => {
          for(let i = 0; i < json.data.length; i++){
            if(item.mountian_id === json.data[i].id){
              this.setState(prevState => ({
                myPlanMount: [...prevState.myPlanMount, json.data[i]]
              }))
            }
          }
        })
      })
  }

  removePlan = (key) => {
    // console.log(this.state.myPlans)
    // let copyArr = [...this.state.myPlans]
    // copyArr.splice(key, 1);
    // console.log(copyArr)
    // this.setState({ myPlans: copyArr })
    // console.log(this.state.myPlans)
    window.fetch(`/v1/plans/${this.state.myPlans[key].id}`, {
      method: 'DELETE',
      headers: {
        'X-User-Token': localStorage.getItem('token'),
        'X-User-Email': localStorage.getItem('email')
      }
    })
    window.location.reload()
  }

  render() {
    return (
      <div>
        <h1> Plan. </h1>
        <div>
        {this.state.myPlanMount.map((item, key) => {
          return(
            <div key={key}>
              <p>
              <Link to={{
                pathname: '/nowclimbing',
                state: {mountian: this.state.myPlanMount[key]}
              }}> Start Climb </Link>
                {item.name}
                <button onClick={() => this.removePlan(key)}>
                  Remove
                </button>
              </p>
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





// import React, { Component } from 'react';
// import NavBar from './navbar';
//
// class Plan extends Component {
//   constructor(props){
//     super(props)
//
//     this.state = {
//       myPlans: [],
//       myPlanMount: []
//     }
//   }
//
//   componentDidMount(){
//     window.fetch('/v1/plans/', {
//       method: 'GET',
//       headers: {
//         'X-User-Token': localStorage.getItem('token'),
//         'X-User-Email': localStorage.getItem('email')
//       }})
//       .then(response => response.json())
//       .then(json => {
//         console.log(json.data)
//         this.setState({ myPlans: json.data})
//         this.getMountians()
//       })
//   }
//
//   getMountians(){
//     console.log('got em')
//     window.fetch('/v1/mountians/', {
//       method: 'GET',
//       headers: {
//         'X-User-Token': localStorage.getItem('token'),
//         'X-User-Email': localStorage.getItem('email')
//       }})
//       .then(response => response.json())
//       .then(json => {
//         console.log(json.data[0].id)
//       })
//   }
//
//   render() {
//     return (
//       <div>
//         <h1> Plan. </h1>
//         <div>
//         {this.state.myPlans.map((item, key) => {
//           return(
//             <div key={key}>
//               {item.mountian_id}
//             </div>
//             )
//           }
//         )}
//         </div>
//         < NavBar />
//       </div>
//     );
//   }
// }
//
// export default Plan;
