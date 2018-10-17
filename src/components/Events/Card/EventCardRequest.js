import React, {Component} from 'react';
import { connect } from 'react-redux';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';
import Avatar from 'components/Shared/Avatar';
import ConvertTimestampToStr from 'helpers/ConvertTimestampToStr';
import SimpleInput from 'components/Forms/SimpleInput';
import { openModal } from 'actions/modal'

class EventCardRequest extends Component {
  constructor(){
    super()

    this.state = {
      chatText: ""
    }
  }


  // cta actions
  acceptRequest = () => {

  }

  declineRequest = () => {

  }

  // mini chat
  handleChange = (e) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fieldVal});
  }

  sendMessage = () => {

  }

  // open chat with specific dialog
  goToChat = () => {
    this.props.openModal({
      name: "messages",
      "options": {
        "activeDialog": 1
      }
    })
  }

  render(){
    const {
      props: {
        request: {
          // id,
          status,
          timestamp,
          message,
          user
        }
      },
      // state: {chatText}
    } = this

    return(
      <div className="ec-request">
        <div className="ec-request__avatar">
          <Avatar
            className="avatar avatar--64"
            user={user} />
        </div>
        <div className="ec-request__contents">
          <div className="ec-request__header">
            <div className="ec-request__user">
              <div className="ec-request__user-row">
                <div className="ec-request__user-name">{user.username}, {user.age}</div>
                <div className="ec-request__user-status">
                  { user.isVerified &&
                    <div className="icon-verified">
                      <SvgIcon name="checkmark" />
                    </div>
                  }
                </div>
              </div>
              <div className="ec-request__user-distance">{user.distance}</div>
            </div>
            <div className="ec-request__timestamp">
              {ConvertTimestampToStr(timestamp)}
            </div>
          </div>
          <div className="ec-request__message">{message}</div>
          <div className="ec-request__actions">
            {this.renderActions(status)}
            {this.renderSender(status)}
          </div>
        </div>
      </div>
    )
  }

  renderActions = (status) => {
    switch (status) {
      case "pending":
        return(
          <div className="ec-request__cta ui-buttons-group">
            <button
              onClick={this.acceptRequest}
              className="btn btn-primary btn--iconed">
              <SvgIcon name="checkmark" />
              <span>Принять запрос</span>
            </button>
            <button
              onClick={this.declineRequest}
              className="btn btn-outline btn-outline--muted btn--iconed">
              <SvgIcon name="close" />
              <span>Отклонить </span>
            </button>
          </div>
        )
      case "acepted":
        return(
          <div className="ec-request__cta">
            <button
              onClick={this.acceptRequest}
              className="btn btn-outline btn-outline--green btn--iconed">
              <SvgIcon name="checkmark" />
              <span>Запрос принят</span>
            </button>
          </div>
        )
      default:

    }

  }

  renderSender = (status) => {
    const { chatText } = this.state;
    switch(status){
      case "pending":
        return(
          <div className="ec-request__sender">
            <div className="ec-request__mini-chat">
              <div className="avatar avatar--small">
                <Image file={this.props.userDetails.avatar} />
              </div>
              <SimpleInput
                name="chatText"
                placeholder="Написать сообщение"
                icon="sent"
                value={chatText}
                iconClickHandler={this.sendMessage}
                onChangeHandler={this.handleChange} />
            </div>
          </div>
        )
      default:
        return(
          <div className="ec-request__sender">
            <button
              onClick={this.goToChat}
              className="btn btn-outline btn--iconed">
              <SvgIcon name="comments" />
              <span>перейти в чат</span>
            </button>
          </div>
        )
    }
  }

}

const mapStateToProps = (state) => ({
  userDetails: state.user.userDetails
})

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCardRequest)
