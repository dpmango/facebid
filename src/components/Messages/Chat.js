import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'reapop';
import api from 'services/Api';

import EmptyChat from './EmptyChat';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatCreate from './ChatCreate';
import ChatRequestMessage from './ChatRequestMessage';

class Chat extends Component {
  constructor(){
    super()

    this.blankState = {
      type: null,
      user: null,
      messages: [],
      welcomeMessage: null
    }

    this.state = this.blankState
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if (nextProps.value !== prevState.value) {
  //     return { value: nextProps.value};
  //   } else {
  //     return null;
  //   }
  // }

  componentDidMount(){
    this.getMessages();
  }
  
  componentDidUpdate(prevProps, prevState) {
    // when selected dialog in sidebar
    if (prevProps.activeDialog !== this.props.activeDialog){
      this.getMessages()
    }
  }

  getMessages = () => {
    api
      .get(`messageChat?id=${this.props.activeDialog}`)
      .then(res => {
        setTimeout(() => {
          // TODO - on real server blank error should not happens
          // in test env we have only couple chats with messages
          if ( res.data.length === 0 ){
            this.setState(this.blankState)
            return false
          }
          // TODO - refactor to json object responce with real server
          const resp = res.data[0];

          this.setState({
            ...this.state,
            type: resp.type,
            user: resp.user,
            messages: resp.messages,
            welcomeMessage: resp.welcomeMessage
          })
        }, 100) // emulate timeout - TODO - remove
      })
      .catch(err => {
        console.log('something wrong happens when fetching messageChat', err)
      })
  }

  // when new message is submited
  createSubmit = () => {
    this.props.notify({
      title: 'Форма отправлена',
      message: 'В процессе',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })
  }


  render(){
    const {
      props: { activeDialog },
      state: { user, messages, type, welcomeMessage }
    } = this;

    return(
      <div className="ms-chat">
        { !activeDialog ?
          <EmptyChat />
          :
          <Fragment>
            <ChatHeader
              user={user} />

            { type !== "request" ?
              <Fragment>
                <ChatMessages
                  messages={messages} />

                <ChatCreate
                  onSend={this.createSubmit} />
              </Fragment>
              :
              <ChatRequestMessage
                message={welcomeMessage}
                user={user} />
            }
          </Fragment>
        }
      </div>
    )
  }
}

Chat.propTypes = {
  notify: PropTypes.func
}


const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data))
})

export default connect(null, mapDispatchToProps)(Chat)
