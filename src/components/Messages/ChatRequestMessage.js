import React, {Component} from 'react';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';

class ChatRequestMessage extends Component {

  acceptRequest = () => {

  }

  declineRequest = () => {

  }

  render(){
    const { user, message } = this.props;

    return(
      <div className="ms-chat__scrollable">
        <div className="ms-request">
          <div className="ms-request__image">
            <Image folder="system" file="chatWelcomeImage.png" />
          </div>
          <div className="ms-request__timestamp t-small">Новый запрос от 19.04</div>
          <div className="ms-request__title h4-title">{user.name} хочет общаться с Вами</div>
          <p className="ms-request__message t-primary">{message}</p>

          <div className="ms-request__cta ui-buttons-group">
            <button
              onClick={this.acceptRequest}
              className="btn btn-primary btn--iconed">
              <SvgIcon name="checkmark" />
              <span>принять</span>
            </button>
            <button
              onClick={this.declineRequest}
              className="btn btn-outline btn-outline--muted btn--iconed">
              <SvgIcon name="close" />
              <span>отклонить</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatRequestMessage
