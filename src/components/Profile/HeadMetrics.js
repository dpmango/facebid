import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Subscribers from './Subscribers';
import { openModal } from '../../actions/modal';

class HeadMetrics extends Component {

  render(){
    const { subscribers, subscribed } = this.props;

    return(
      <div className="p-head__metrics">
        <div
          onClick={this.props.openModal.bind(this, 'subscribers', 1)}
          className="p-head__metric">
          <div className="p-head__metric-num">{subscribers}</div>
          <div className="p-head__metric-name">Подписчики</div>
        </div>
        <div
          onClick={this.props.openModal.bind(this, 'subscribers', 2)}
          className="p-head__metric">
          <div className="p-head__metric-num">{subscribed}</div>
          <div className="p-head__metric-name">Подписки</div>
        </div>
        
        <Subscribers />
      </div>
    )
  }
}

HeadMetrics.propTypes = {
  openModal: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
});


export default connect(null, mapDispatchToProps)(HeadMetrics);
