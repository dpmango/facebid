import React, { Component } from 'react';

class HeadMetrics extends Component {

  render(){
    const { subscribers, subscribed } = this.props;

    return(
      <div className="p-head__metrics">
        <div className="p-head__metric">
          <div className="p-head__metric-num">{subscribers}</div>
          <div className="p-head__metric-name">Подписчики</div>
        </div>
        <div className="p-head__metric">
          <div className="p-head__metric-num">{subscribed}</div>
          <div className="p-head__metric-name">Подписки</div>
        </div>
      </div>
    )
  }
}

export default HeadMetrics
