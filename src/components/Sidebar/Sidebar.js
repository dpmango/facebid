import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewUser from './NewUser';
import Featured from './Featured';
import GeolocationRequest from '../Modal/GeolocationRequest';

class Sidebar extends Component {
  static propTypes = {

  };

  componentDidMount(){
    setTimeout(() => {
      this.geoModal.show();
    }, 5000)
  }

  render() {
    return (
      <div className="sidebar">
        <GeolocationRequest onRef={ref => (this.geoModal = ref)} />
        <div className="sidebar__wrapper">
          <div className="sidebar__logo">
            <i className="icon icon-logo"></i>
          </div>
          <div className="sidebar__user">
            <NewUser />
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
