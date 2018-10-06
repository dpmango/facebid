import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { routes } from './Routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Authorization from './hoc/Authorization';
import ScrollTo from './services/ScrollTo';
import { setClass } from './actions/page';
import { closeModal, openModal } from './actions/modal';
import { rememberRoute, resetRoute } from './actions/route';

class RenderSwitch extends React.Component {

  componentDidMount(){
    // set the page class when returning from service pages
    this.props.setPageClass('')
  }

  componentDidUpdate(prevProps) {

    console.log('switch update with state', this.props.location.state)

    // some routes pass Redirect state
    if ( this.props.location.state ){
      if ( this.props.location.state.fromProtected ){
        this.props.openModal('signup');
      }
      if ( this.props.location.state.prevRoute && !this.props.startRouteRedirect ){
        this.props.rememberRoute(this.props.location.state.prevRoute);
      }
      if ( this.props.location.shouldClear ){
        this.props.resetRoute()
      }
    }

    // when path has changed
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ScrollTo(0, 300);
      this.props.closeModal()
      // set the page class when returning from service pages
      this.props.setPageClass('')
    }
  }


  render(){
    // to pass extra props
    // <Component aosInst={this.aos} {...props}/>
    // const PropsRoute = ({ component: Component, ...rest }) => (
    //   <Route {...rest} render={props => (
    //     <Component {...props}/>
    //   )}/>
    // )

    const { startRouteRedirect, prevRoute } = this.props
    console.log('switch render with state', this.props.location.state)
    return(
      <Switch>
        {routes.map(route => {
          const component = route.protected ? Authorization(route.component) : route.component;
          return (
            <Route
              key={route.path}
              exact={route.isExact}
              path={route.path}
              component={component}
            />
          )
        })}
        { startRouteRedirect &&
          <Redirect to={{
            pathname: prevRoute,
            state: {
              shouldClear: true
            }
          }} />
        }
      </Switch>
    )
  }
}

RenderSwitch.propTypes = {
  setPageClass: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  rememberRoute: PropTypes.func,
  resetRoute: PropTypes.func
};

const mapStateToProps = (state) => ({
  startRouteRedirect: state.route.startRedirect
});

const mapDispatchToProps = (dispatch) => ({
  setPageClass: (data) => dispatch(setClass(data)),
  closeModal: () => dispatch(closeModal()),
  openModal: (data) => dispatch(openModal(data)),
  rememberRoute: (data) => dispatch(rememberRoute(data)),
  resetRoute: () => dispatch(resetRoute())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RenderSwitch)
);
