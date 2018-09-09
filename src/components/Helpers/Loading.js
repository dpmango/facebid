import React, {Component} from 'react';

const Loading = (props) => {

  const { type } = props

  if ( type === "my-profile" ){

  }

  return(
    <div className="loading-container">
      {/* <div class="loading-default">
        <span></span>
        <span></span>
        <span></span>
      </div> */}
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>
  )
}

export default Loading;
