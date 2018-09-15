import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SvgIcon from '../Helpers/SvgIcon';
import { openModal } from '../../actions/modal';

class HeadSettingsButtons extends Component{

  constructor(){
    super()

    this.state = {
      moreMenuOpened: false,
    }
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

  dislikeClick = () => {
    // TODO - + API call
  }

  lockClick = () => {
    // TODO - + API call
  }

  render(){

    const { moreMenuOpened } = this.state;

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
          className={"p-head__settings-btn btn btn-circle dropdown" + (moreMenuOpened ? " is-active" : "")}>
          <SvgIcon name="more" />
          <div className="dropdown__hidden">
            <ul className="dropdown__menu">
              <li onClick={this.dislikeClick}>
                <div className="dropdown__menu-icon">
                  <SvgIcon name="dislike" />
                </div>
                <span>Пожаловаться</span>
              </li>
              <li onClick={this.lockClick}>
                <div className="dropdown__menu-icon">
                  <SvgIcon name="lock" />
                </div>
                <span>Заблокировать</span>
              </li>
            </ul>
          </div>
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
