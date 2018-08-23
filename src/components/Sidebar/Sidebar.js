import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewUser from './NewUser';

class Sidebar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__wrapper">
          <div className="sidebar__logo">
            <i className="icon icon-logo"></i>
          </div>
          <div className="sidebar__user">
            <NewUser />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
