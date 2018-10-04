import React, {Component} from 'react';
import Avatar from 'components/Shared/Avatar';
import ConvertTimestampToStr from 'helpers/ConvertTimestampToStr';

class EventCardNotificaiton extends Component{
  render(){
    const { notification } = this.props;

    return(
      <div className="ec-notification">
        <Avatar user={notification.user} />
        <div className="ec-notification__content">
          <div className="ec-notification__name">{notification.user.username} <span>{notification.event}</span></div>
          <div className="ec-notification__timestamp">{ConvertTimestampToStr(notification.timestamp)}</div>
        </div>
      </div>
    )
  }
}

export default EventCardNotificaiton
