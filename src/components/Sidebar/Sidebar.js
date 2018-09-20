import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewUser from './NewUser';
import AuthUser from './AuthUser';
import Featured from './Featured';

class Sidebar extends Component {
  render() {
    const {
      props: { menuOpened, userId },
    } = this;

    return (
      <div
        className={"sidebar" + (menuOpened ? " is-active": "")}>
        <div className="sidebar__scrollable">
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
              <Link to="/">О компании</Link>
              <Link to="/">Правила</Link>
              <Link to="/">О компании</Link>
            </div>
          </div>
        </div>
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
