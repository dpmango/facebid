import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import NotificationsSystem from 'reapop';
// import theme from 'reapop-theme-wybo';
import theme from '../theme/reapop'
import Gradients from './Helpers/Gradients'
import GeolocationRequest from './Modal/GeolocationRequest';
import ShareModal from './Modal/ShareModal';
import CreateEvent from './Events/Create';
import Settings from './ProfileSettings/Settings';
import Notifications from './Notifications/Notifications';
import Messages from './Messages/Messages';

class Common extends Component {
  render(){
    return(
      <Fragment>
        <NotificationsSystem theme={theme} />
        <Gradients />
        <GeolocationRequest />
        <ShareModal />
        <CreateEvent />
        {this.props.userId &&
          <React.Fragment>
            <Notifications />
            <Settings />
            <Messages />
          </React.Fragment>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
});

export default connect(mapStateToProps, null)(Common);
