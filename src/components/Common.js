import React, {Component} from 'react';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import Gradients from './Helpers/Gradients'
import GeolocationRequest from './Modal/GeolocationRequest';

class Common extends Component {
  render(){
    return(
      <React.Fragment>
        <NotificationsSystem theme={theme} />
        <Gradients />
        <GeolocationRequest />
      </React.Fragment>
    )
  }
}

export default Common;
