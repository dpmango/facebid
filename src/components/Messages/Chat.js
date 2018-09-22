import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'reapop';
import api from 'services/Api';

import EmptyChat from './EmptyChat';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatCreate from './ChatCreate';

class Chat extends Component {
  constructor(){
    super()

    this.state = {
      type: null,
      user: null,
      messages: []
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if (nextProps.value !== prevState.value) {
  //     return { value: nextProps.value};
  //   } else {
  //     return null;
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    // when selected dialog in sidebar
    if (prevProps.activeDialog !== this.props.activeDialog){
      this.getMessages()
    }
  }

  getMessages = () => {
    api
      // ?id=${this.props.activeDialog}
      .get(`messageChat?id=1`)
      .then(res => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            type: res.data[0].type,
            user: res.data[0].user,
            messages: res.data[0].messages
          })
        }, 500)
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
      state: { user, messages } // + type
    } = this;

    return(
      <div className="ms-chat">
        { !activeDialog ?
          <EmptyChat />
          :
          <Fragment>
            <ChatHeader
              user={user} />

            <ChatMessages
              messages={messages} />

            <ChatCreate
              onSend={this.createSubmit} />
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
