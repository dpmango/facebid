import React, { Component } from "react";

export default class Loader extends Component {
  descriptionBlock = () => {
    const { timedOut, error, pastDelay, retry } = this.props;

    if (error) {
      // When the loader has errored
      return (
        <div className="loader__desc">
          Something wrong. <br/> Would you like to <a onClick={ retry }>Retry</a>?
        </div>
      );
    } else if (timedOut) {
      // When the loader has taken longer than the timeout
      return (
        <div className="loader__desc">
          Loading is slower than normal... <br/> Would you like to <a onClick={ retry }>Retry</a>?
        </div>
      )
    } else if (pastDelay) {
      // When the loader has taken longer than the delay
      return null;
      // return (
      //   <div className="loader__desc">Loading...</div>
      // );
    } else {
      // When the loader has just started
      return null;
    }

  }

  render(){
    const { timedOut, error, pastDelay } = this.props;

    if ( !error && !timedOut && !pastDelay ){
      return null
    } else {
      return(
        <div className="loader">
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
          { this.descriptionBlock() }
        </div>
      )
    }

  }
}
