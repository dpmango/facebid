import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routes } from './Routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ScrollTo from './services/ScrollTo';
import AOS from 'aos';

class RenderSwitch extends React.Component {
  static propTypes = {
  };

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
  }


  render(){
    const PropsRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <Component aosInst={this.aos} {...props}/>
      )}/>
    )

    return(
      <Switch>
        {routes.map(route => (
          <PropsRoute
            key={route.path}
            exact={route.isExact}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    )
  }
}
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RenderSwitch)
);
