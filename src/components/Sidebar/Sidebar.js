import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewUser from './NewUser';
import AuthUser from './AuthUser';
import Featured from './Featured';
import GeolocationRequest from '../Modal/GeolocationRequest';
import GetCoordsOnDocument from '../../services/GetCoordsOnDocument'

class Sidebar extends Component {
  constructor(){
    super()

    this.state = {
      leftPos: null
    }
  }

  componentDidMount(){
    this.setCoords()
  }

  setCoords = () => {
    const leftPos = GetCoordsOnDocument(
      document.querySelector('.page.container')
    ).left;


    this.setState({
      leftPos: leftPos + 50
    })
  }

  render() {

    const {
      props: { menuOpened, userId },
      state: { leftPos }
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
              <a href="#">О компании</a>
              <a href="#">Правила</a>
              <a href="#">О компании</a>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(Sidebar);
