import React, {Component} from 'react';
import { connect } from 'react-redux';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';
import ConvertTimestampToStr from 'helpers/ConvertTimestampToStr';
import { openModal } from 'actions/modal'

class EventCardRequest extends Component {

  acceptRequest = () => {

  }

  declineRequest = () => {

  }

  render(){
    const {
      request: {
        id,
        status,
        timestamp,
        message,
        user
      }
    } = this.props

    return(
      <div className="ec-request">
        <div className="ec-request__avatar">
          <div className="avatar avatar--64">
            <Image file={user.avatar} />
          </div>
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
        break;
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
    switch(status){
      case "pending":
        return(
          <div className="ec-request__sender">

          </div>
        )
        break
      default:
        return(
          <div className="ec-request__sender">
            <button
              onClick={this.props.openModal.bind(this, 'messages')}
              className="btn btn-outline btn--iconed">
              <SvgIcon name="comments" />
              <span>перейти в чат</span>
            </button>
          </div>
        )
    }
  }

}

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(null, mapDispatchToProps)(EventCardRequest)
