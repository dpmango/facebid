import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'reapop';
import SvgIcon from 'components/Helpers/SvgIcon';
import Dropdown from 'components/Interface/Dropdown';
import { openModal } from 'actions/modal';

class HeadSettingsButtons extends Component{

  settingsClick = () => {
    this.props.openModal('settings')
  }

  abuseClick = () => {
    this.props.openModal({
      name: "abuse",
      options: {
        'url': `profile/${this.props.profileId}`
      }
    })
  }

  lockClick = () => {
    // TODO - + API call
    this.props.notify({
      title: 'Пользователь заблокирован',
      message: `Вы успешно заблокировали ${this.props.username}`,
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })
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
              onClick={this.abuseClick}>
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
  openModal: (data) => dispatch(openModal(data)),
  notify: (data) => dispatch(notify(data))
});


export default connect(null, mapDispatchToProps)(HeadSettingsButtons);
