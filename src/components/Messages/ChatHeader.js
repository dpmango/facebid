import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';
import Loading from 'components/Helpers/Loading';
import Dropdown from 'components/Interface/Dropdown';

class ChatHead extends Component{
  // constructor(){
  //   super();
  //
  // }

  render(){
    const {
      props: {user}
    } = this;

    return(
      <div className="ms-chat__header">
        { !user ?
          <Loading />
          :
          <Fragment>
            <div className="ms-chat__user">
              <div className="ms-chat__user-avatar">
                <div className="avatar avatar--medium">
                <Image file={user.avatar} />
              </div>
              </div>
              <div className="ms-chat__user-name">{user.name}</div>
            </div>
            <div className="ms-chat__actions">
              <Dropdown
                extraClass="ms-chat__action-more">
                <ul className="dropdown__menu">
                  <li>
                    <Link
                      className="dropdown__menu-item"
                      to={`/profile/${user.userId}`}>
                      <div className="dropdown__menu-icon">
                        <SvgIcon name="profile-thin" />
                      </div>
                      <span>Перейти в профиль</span>
                    </Link>
                  </li>
                  <li className="dropdown__menu-item">
                    <div className="dropdown__menu-icon">
                      <SvgIcon name="bell-thin" />
                    </div>
                    <span>Отключить уведомления</span>
                  </li>
                  <li className="dropdown__menu-item">
                    <div className="dropdown__menu-icon">
                      <SvgIcon name="trashbin" />
                    </div>
                    <span>Очистить историю</span>
                  </li>
                  <li className="dropdown__menu-item">
                    <div className="dropdown__menu-icon">
                      <SvgIcon name="lock" />
                    </div>
                    <span>Заблокировать</span>
                  </li>
                  <li className="dropdown__menu-item">
                    <div className="dropdown__menu-icon">
                      <SvgIcon name="flag" />
                    </div>
                    <span>Пожаловаться</span>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </Fragment>
        }
      </div>
    )
  }
}

export default ChatHead
