import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { openMenu, closeMenu } from '../../actions/header';

class Header extends Component {

  toggleMenu = () => {
    const { menuOpened, openMenu, closeMenu } = this.props

    console.log('toggleMenu is called')
    if ( menuOpened ){
      closeMenu();
    } else {
      openMenu();
    }
  }

  render(){
    const {
      props: {
        menuOpened
      }
    } = this;

    return(
      <header className={"header" + (menuOpened ? " is-active": "") }>
        <div className="container">
          <div className="header__wrapper">
            <div className="header__hamburger">
              <button
                onClick={this.toggleMenu}
                className={"hamburger hamburger--spin" + (menuOpened ? " is-active": "") }
                type="button">
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <div className="header__logo">
              <i className="icon icon-logo"></i>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  menuOpened: PropTypes.bool
}

const mapStateToProps = (state) => ({
  menuOpened: state.header.menuOpened
});

const mapDispatchToProps = (dispatch) => ({
  openMenu: () => dispatch(openMenu()),
  closeMenu: () => dispatch(closeMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
