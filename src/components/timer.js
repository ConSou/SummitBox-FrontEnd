import React, { Component } from 'react';

class Timer extends Component {
  constructor(props){
    super(props)

    this.state = {
      secondsElapsed: 0,
      finalTime: null
    }
    this.incrementer = null;
  }

  componentDidMount(){
    this.incrementer = setInterval(() =>
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1}),
      1000
    )

  }

  componentWillUnmount(){
    clearInterval(this.incrementer)
  }

  render() {
    return (
      <div>
        {this.state.secondsElapsed}
      </div>
    );
  }
}

export default Timer;
