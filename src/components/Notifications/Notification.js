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
            {type === "invited" &&
              <p>
                <span>{user.username}</span> приглашает Вас на событие <a href={data.id}><span>{data.event}</span></a>
              </p>
            }
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
