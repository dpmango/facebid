import React, {Component, Fragment} from 'react';
import NotificationsSystem from 'reapop';
// import theme from 'reapop-theme-wybo';
import theme from '../theme/reapop'
import Gradients from './Helpers/Gradients'
import GeolocationRequest from './Modal/GeolocationRequest';
import ShareModal from './Modal/ShareModal';

class Common extends Component {
  render(){
    return(
      <Fragment>
        <NotificationsSystem theme={theme} />
        <Gradients />
        <GeolocationRequest />
        <ShareModal />
      </Fragment>
    )
  }
}

export default Common;
