import React from 'react';

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

  if ( type === "invites" ){
    return(
      [1,2,3,4,5,6].map(x => (
        <div key={x} className="invite-grid__col">
          <div className="i-card is-loading">
            <div className="i-card__contents">
              <div className="i-card__user">
                <div className="i-card__user-name"></div>
                <div className="i-card__user-distance"></div>
              </div>
              <div className="i-card__cta"><span></span></div>
            </div>
          </div>
        </div>
      ))
    )
  }

  if ( type === "my-profile" ){

  }

  return(
    <div className="loading-container">
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
