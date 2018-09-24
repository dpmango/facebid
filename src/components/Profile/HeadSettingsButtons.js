import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SvgIcon from 'components/Helpers/SvgIcon';
import Dropdown from 'components/Interface/Dropdown';
import { openModal } from 'actions/modal';

class HeadSettingsButtons extends Component{

  settingsClick = () => {
    // open settings modal page
    this.props.openModal('settings')
  }

  dislikeClick = () => {
    // TODO - + API call
  }

  lockClick = () => {
    // TODO - + API call
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
        <Dropdown
          extraClass="p-head__settings-btn btn btn-circle">
          <ul className="dropdown__menu">
            <li
              className="dropdown__menu-item"
              onClick={this.dislikeClick}>
              <div className="dropdown__menu-icon">
                <SvgIcon name="dislike" />
              </div>
              <span>Пожаловаться</span>
            </li>
            <li
              className="dropdown__menu-item"
              onClick={this.lockClick}>
              <div className="dropdown__menu-icon">
                <SvgIcon name="lock" />
              </div>
              <span>Заблокировать</span>
            </li>
          </ul>
        </Dropdown>
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
