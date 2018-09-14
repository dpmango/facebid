import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SvgIcon from '../Helpers/SvgIcon';
import { openModal } from '../../actions/modal';

class HeadSettingsButtons extends Component{

  constructor(){
    super()

    this.setState({
      moreMenuOpened: false,
    })
  }

  toggleMoreBtn = () => {
    this.setState({
      moreMenuOpened: !this.state.moreMenuOpened
    })
  }

  settingsClick = () => {
    // open settings modal page
    this.props.openModal('settings')
  }

  render(){

    if ( this.props.isMyProfile ){
      return(
        <div
          onClick={this.settingsClick}
          className="p-head__settings-btn btn btn-circle">
          <SvgIcon name="gear" />
        </div>
      )
    } else {
      return (
        <div
          onClick={this.toggleMoreBtn}
          className="p-head__settings-btn btn btn-circle">
          <SvgIcon name="more" />
        </div>
      )
    }
  }
}


HeadSettingsButtons.propTypes = {
  openModal: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
});


export default connect(null, mapDispatchToProps)(HeadSettingsButtons);
