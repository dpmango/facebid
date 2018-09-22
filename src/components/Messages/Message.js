import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/Helpers/SvgIcon';
import ConvertTimestampToStr from 'helpers/ConvertTimestampToStr'


class Message extends Component{
  render(){
    const {
      props: {
        data: {
          origin, content, timestamp, isRead
        }
      }
    } = this;

    return(
      <div
        className={`ms-message ms-message--${origin}`}>
        <div className={`ms-message__content ms-message__content--${content.type}`}>
          {content.text}
        </div>

        <div className="ms-message__meta">
          { origin === "outgoing" &&
            <div className="ms-message__status">
              { isRead ?
                <SvgIcon name="ms-status-read" />
                :
                <SvgIcon name="checkmark" />
              }
            </div>
          }
          <div className="ms-message__timestamp">
            {ConvertTimestampToStr(timestamp)}
          </div>
        </div>

      </div>
    )
  }
}

Message.propTypes = {
  data: PropTypes.object.isRequired
}

export default Message
