import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewUser from './NewUser';
import AuthUser from './AuthUser';
import Featured from './Featured';
import GeolocationRequest from '../Modal/GeolocationRequest';

class Sidebar extends Component {
  render() {

    const {
      props: {
        menuOpened, userId
      }
    } = this;

    return (
      <div className={"sidebar" + (menuOpened ? " is-active": "")}>
        <div className="sidebar__wrapper">
          <div className="sidebar__logo">
            <i className="icon icon-logo"></i>
          </div>
          <div className="sidebar__user">
            { !userId && <NewUser /> }
            { userId && <AuthUser /> }
          </div>
          <Featured />
          <div className="sidebar__footer">
            <a href="#">О компании</a>
            <a href="#">Правила</a>
            <a href="#">О компании</a>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  menuOpened: PropTypes.bool,
  // userId: PropTypes.number
}

const mapStateToProps = (state) => ({
  menuOpened: state.header.menuOpened,
  userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
