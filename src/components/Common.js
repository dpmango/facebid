import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import NotificationsSystem from 'reapop';
// import theme from 'reapop-theme-wybo';
import theme from '../theme/reapop'
import Gradients from './Helpers/Gradients';
import Onboarding from './Onboarding/Onboarding';
import GeolocationRequest from './Modal/GeolocationRequest';
import ShareModal from './Modal/ShareModal';
import CreateEvent from './Events/Create';
import Settings from './ProfileSettings/Settings';
import Notifications from './Notifications/Notifications';
import Messages from './Messages/Messages';
import Premium from './Premium/Premium';

class Common extends Component {
  render(){

    const {userId, onboarding} = this.props

    return(
      <Fragment>
        <NotificationsSystem theme={theme} />
        <Gradients />
        <GeolocationRequest />
        <ShareModal />
        <CreateEvent />
        {userId &&
          <React.Fragment>
            <Notifications />
            <Settings />
            <Messages />
            <Premium />
          </React.Fragment>
        }
        {onboarding.isActive &&
          <Onboarding />
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  onboarding: state.onboarding
});

export default connect(mapStateToProps, null)(Common);
