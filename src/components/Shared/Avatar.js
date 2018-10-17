import React, {Component} from 'react';
import Image from '../Helpers/Image';

class Avatar extends Component{
  constructor(){
    super()

    this.backgrounds = ["#00A9FF", "#FCA329", "#35C061", "#E71616", "#8848FE", "#EFA747"]

    this.state = {
      background: this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)]
    }
  }

  renderInitials = () => {
    const { user } = this.props

    if ( user.username ){
      return user.username.slice(0,2)
    }
  }

  render(){
    const { className, user } = this.props
    // user should have props to render image or nickname
    // email: action.payload.email,
    // avatar: action.payload.avatar,
    // username: action.payload.username,
    // fullname: action.payload.fullname

    return(
      <div
        style={{
          background: this.state.background
        }}
        className={className || "avatar"}>
        {user.avatar ?
          <Image file={user.avatar} />
          :
          <span className="avatar__letters">
            {this.renderInitials()}
          </span>
        }
      </div>
    )
  }
}

export default Avatar
