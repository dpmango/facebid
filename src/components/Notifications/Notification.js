import React, {Component} from 'react';
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import ConvertTimestampToStr from '../../helpers/ConvertTimestampToStr'

class Notification extends Component {
  constructor(){
    super()
  }

  // type invited
  acceptInvite = () => {

  }

  declineInvite = () => {

  }

  renderIconType = (type) => {
    switch(type){
      case "invited":
        return "add"
      case "comment":
        return "comments"
      case "eventcreated":
        return "star-stroke"
      case "subscribed":
        return "rss"
      case "application":
        return "checkmark"
      case "photo":
        return "camera-add"
      case "profileview":
        return "eye"
      default:
        return null
    }
  }

  renderNotificaitonContent = (type) => {

    const { user, data } = this.props

    switch(type){
      case "invited":
        return (
          <React.Fragment>
            <span>{user.username}</span> приглашает Вас на событие <a href={data.id}><span>«{data.event}»</span></a>
          </React.Fragment>
        )
      case "comment":
      return (
        <React.Fragment>
          <span>{user.username}</span> оставил комментарий под Вашим событием
        </React.Fragment>
      )
      case "eventcreated":
      return (
        <React.Fragment>
          <span>{user.username}</span> создал новое событие <a href={data.id}><span>«{data.event}»</span></a>
        </React.Fragment>
      )
      case "subscribed":
        return (
          <React.Fragment>
            <span>{user.username}</span> подписался на Ваши обновления
          </React.Fragment>
        )
      case "application":
        return (
          <React.Fragment>
            <span>{user.username} и еще {data.participants}</span> оставили заявку на событие «Название события»
          </React.Fragment>
        )
      case "photo":
        return (
          <React.Fragment>
            <span>{user.username}</span> добавил <span>{data.counter} фотографий</span> в свой профиль
          </React.Fragment>
        )
      case "profileview":
        return (
          <React.Fragment>
            <span>{user.username}</span> посетил Ваш профиль
          </React.Fragment>
        )
      default:
        return null
    }
  }

  render(){

    const {
      props: { id, user, type, data, timestamp }
    } = this

    return(
      <div className="notification">
        <div className="notification__user">
          <div className="avatar-outline avatar-outline--small">
            <div className="avatar-outline__wrapper">
              <div className="avatar-outline__holder">
                <Image file={user.avatar}/>
              </div>
            </div>
          </div>
          <div className={`notification__type notification__type--${type}`}>
            <SvgIcon name={this.renderIconType(type)} />
          </div>
        </div>
        <div className="notification__wrapper">
          <div className="notification__content">
            <p>{this.renderNotificaitonContent(type)}</p>
            <div className="notification__timestamp">
              {ConvertTimestampToStr(timestamp)}
            </div>
          </div>

          <div className="notification__actions">
            {type === "invited" &&
              <React.Fragment>
                <button
                  onClick={this.acceptInvite}
                  className="btn btn-outline">
                  Принять
                </button>
                <button
                  onClick={this.declineInvite}
                  className="btn btn-outline btn-outline--muted">
                  Отказать
                </button>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Notification
