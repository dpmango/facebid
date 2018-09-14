import React, {Component} from 'react';

const Loading = (props) => {

  const { type } = props

  if ( type === "events" ){
    return(
      // two loading cards
      [1,2].map((el, i) => {
        return(
          <div
            key={i}
            className="loading-event">

          </div>
        )
      })
    )
  }

  if ( type === "my-profile" ){

  }

  return(
    <div className="loading-container">
      {/* <div class="loading-default">
        <span></span>
        <span></span>
        <span></span>
      </div> */}
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
    </div>
  )
}

export default Loading;
