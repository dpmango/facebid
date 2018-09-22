import React, {Component} from 'react';
import Loading from 'components/Helpers/Loading';
import Message from './Message';

class ChatMessages extends Component{
  render(){
    const { messages } = this.props;

    return(
      <div className="ms-chat__scrollable">
        { messages.length === 0 ?
          <Loading />
          :
          <div className="ms-chat__messages">
            {messages.map(message => (
              <Message
                key={message.id}
                data={message}
              />
            ))}
          </div>
        }
      </div>
    )
  }
}

export default ChatMessages
