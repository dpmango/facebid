import React, {Component} from 'react';
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import UserMenu from './UserMenu';

class AuthUser extends Component{
  render(){
    return(
      <div className="user-panel">
        <div className="user-panel__scope">
          <div className="avatar avatar--glow">
            <Image file="userAvatar_2.jpg" />
          </div>
          <div className="user-panel__scope-contents">
            <div className="user-panel__name">Agneshka, 24</div>
            <div className="user-panel__location">
              <SvgIcon name="location" />
              <span>Moscow, Russia</span>
            </div>
          </div>
        </div>

        <div className="user-panel__actions">
          <div className="panel-action panel-action--up">
            <div className="panel-action__icon">
              <div className="panel-action__counter"><span>12</span></div>
              <SvgIcon name="star-stroke" />
            </div>
            <div className="panel-action__name">Поднять  <br/>объявление</div>
          </div>
          <div className="panel-action panel-action--vip">
            <div className="panel-action__icon">
              <SvgIcon name="crown" />
            </div>
            <div className="panel-action__name">Поднять  <br/>объявление</div>
          </div>
        </div>

        <div className="user-panel__menu">
          <UserMenu />
        </div>

      </div>
    )
  }
}

export default AuthUser;
