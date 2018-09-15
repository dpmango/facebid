import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routes } from './Routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Authorization from './hoc/Authorization';
import ScrollTo from './services/ScrollTo';
import { setClass } from './actions/page'
import AOS from 'aos';

class RenderSwitch extends React.Component {
  constructor(){
    super()
    this.aos = AOS
  }
  componentDidMount(){
    this.aos.init({
      duration: 400,
      offset: 0,
      easing: 'ease-in-sine',
      once: true
    })

    // set the page class when returning from service pages
    this.props.setPageClass('')
  }
  componentDidUpdate(prevProps) {
    const curPathSplit = this.props.location.pathname.split('/');
    const prevPathSplit = prevProps.location.pathname.split('/');

    // disallow transition when switching between the tabs
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ScrollTo(0, 300);
    }

    // refresh AOS
    this.aos.refresh();

    // set the page class when returning from service pages
    this.props.setPageClass('')
  }


  render(){
    const PropsRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <Component aosInst={this.aos} {...props}/>
      )}/>
    )

    return(
      <Switch>
        {routes.map(route => {
          const component = route.protected ? Authorization(route.component) : route.component;
          return (
            <PropsRoute
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
  setClass: PropTypes.func
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  setPageClass: (data) => dispatch(setClass(data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RenderSwitch)
);
