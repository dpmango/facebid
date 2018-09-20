import React, {Component} from 'react';
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import AvatarList from '../People/AvatarList';
import ConvertTimestampToStr from 'helpers/ConvertTimestampToStr'

class Notification extends Component {

  // type invited
  acceptInvite = () => {

  }

  declineInvite = () => {

  }

  render(){

    const {
      // also id if required in api calls
      props: { user, type, timestamp }
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
            <SvgIcon name={this.renderIconType()} />
          </div>
        </div>
        <div className="notification__wrapper">
          <div className="notification__content">
            <p>{this.renderNotificaitonContent()}</p>
            <div className="notification__timestamp">
              {ConvertTimestampToStr(timestamp)}
            </div>
            {this.renderData()}
          </div>

          <div className="notification__actions">
            {this.renderActions()}
          </div>
        </div>
      </div>
    )
  }


  // render helper functions
  renderIconType = () => {

    const { type } = this.props;

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

  renderNotificaitonContent = () => {

    const { user, data, type } = this.props

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
            <span>{user.username} и еще {data.applicants.more + data.applicants.list.length}</span> оставили заявку на событие «Название события»
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

  renderActions = () => {
    const { type } = this.props;

    switch(type){
      case "invited":
        return(
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
        )
      case "subscribed":
        return(
          <button
            onClick={this.acceptInvite}
            className="btn btn-outline">
            Подписаться в ответ
          </button>
        )
      default:
        return null
    }
  }

  renderData = () => {

    const { data, type } = this.props;

    switch(type){
      case "application":
        return(
          <div className="notification__data">
            <AvatarList
              avatars={data.applicants} />
          </div>
        )
      case "photo":
        return (
          <div className="notification__data notification__images">
            {data.photos.map((photo, index) => (
              <div
                key={index}
                className="notification__pic">
                <Image folder="gallery" file={photo} />
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

}

export default Notification
