import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NewUser from './NewUser';
import AuthUser from './AuthUser';
import Featured from './Featured';

class Sidebar extends Component {
  render() {
    const {
      props: { menuOpened, userId }
    } = this;

    return (
      <div
        className={"sidebar" + (menuOpened ? " is-active": "")}>
        <PerfectScrollbar
          className="sidebar__scrollable"
          option={{
            wheelSpeed: 1,
            wheelPropagation: false,
            suppressScrollX: true,
          }} >
          <div className="sidebar__wrapper">
            <Link to="/" className="sidebar__logo">
              <i className="icon icon-logo"></i>
            </Link>
            <div className="sidebar__user">
              { !userId && <NewUser /> }
              { userId && <AuthUser /> }
            </div>
            <Featured />
            <div className="sidebar__footer">
              <Link to="/info/about">О компании</Link>
              <Link to="/info/rules">Правила</Link>
              <Link to="/info/about">О компании</Link>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

Sidebar.propTypes = {
  menuOpened: PropTypes.bool,
  userId: PropTypes.number
}

const mapStateToProps = (state) => ({
  menuOpened: state.header.menuOpened,
  userId: state.user.userId
});

export default connect(mapStateToProps, null, null, {pure:false})(Sidebar);
