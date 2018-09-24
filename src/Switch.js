import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routes } from './Routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Authorization from './hoc/Authorization';
import ScrollTo from './services/ScrollTo';
import { setClass } from './actions/page';
import { closeModal } from './actions/modal'

class RenderSwitch extends React.Component {

  componentDidMount(){
    // set the page class when returning from service pages
    this.props.setPageClass('')
  }

  componentDidUpdate(prevProps) {
    // disallow transition when switching between the tabs
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ScrollTo(0, 300);
      this.props.closeModal()
    }

    // set the page class when returning from service pages
    this.props.setPageClass('')
  }


  render(){
    // to pass extra props
    // <Component aosInst={this.aos} {...props}/>
    // const PropsRoute = ({ component: Component, ...rest }) => (
    //   <Route {...rest} render={props => (
    //     <Component {...props}/>
    //   )}/>
    // )

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
      </Switch>
    )
  }
}

RenderSwitch.propTypes = {
  setPageClass: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setPageClass: (data) => dispatch(setClass(data)),
  closeModal: () => dispatch(closeModal())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RenderSwitch)
);
