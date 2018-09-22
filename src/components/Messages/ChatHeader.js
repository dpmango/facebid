import React, {Component, Fragment} from 'react';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';
import Loading from 'components/Helpers/Loading';

class ChatHead extends Component{
  constructor(){
    super();

    this.state = {
      moreMenuOpened: false
    }
  }

  toggleMoreBtn = () => {
    this.setState({
      moreMenuOpened: !this.state.moreMenuOpened
    })
  }


  render(){
    const {
      props: {user},
      state: {moreMenuOpened}
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
              <div
                onClick={this.toggleMoreBtn}
                className={"ms-chat__action-more dropdown" + (moreMenuOpened ? " is-active" : "")}>
                <SvgIcon name="more" />
                <div className="dropdown__hidden">
                  <ul className="dropdown__menu">
                    <li>
                      <div className="dropdown__menu-icon">
                        <SvgIcon name="dislike" />
                      </div>
                      <span>Перейти в профиль</span>
                    </li>
                    <li>
                      <div className="dropdown__menu-icon">
                        <SvgIcon name="lock" />
                      </div>
                      <span>Заблокировать</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Fragment>
        }
      </div>
    )
  }
}

export default ChatHead
