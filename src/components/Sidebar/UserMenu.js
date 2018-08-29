import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from '../Helpers/SvgIcon';

class UserMenu extends Component {
  render(){

    const menu = [
      {
        link: "/events",
        name: "Поиск встреч",
        icon: "menu-events",
        haveAdd: true,
        haveCounter: false
      },
      {
        link: "/invite",
        name: "Пригласить",
        icon: "menu-invite",
        haveAdd: false,
        haveCounter: false
      },
      {
        link: "/my-events",
        name: "Мои события",
        icon: "menu-my-events",
        haveAdd: false,
        haveCounter: false
      },
      {
        link: "/messages",
        name: "Сообщения",
        icon: "menu-messages",
        haveAdd: false,
        haveCounter: false
      },
      {
        link: "/notifications",
        name: "Уведомления",
        icon: "menu-notifications",
        haveAdd: false,
        haveCounter: false
      },
      {
        link: "/news",
        name: "Новости",
        icon: "menu-news",
        haveAdd: false,
        haveCounter: false
      },
      {
        link: "/bookmarks",
        name: "Закладки",
        icon: "menu-bookmarks",
        haveAdd: false,
        haveCounter: true
      }
    ]
    return(
      <ul className="user-menu">
        {menu.map((el, index) => {
          return (
            <li key={index}>
              <NavLink to={el.link} activeClassName="is-active">
                <div className="user-menu__icon">
                  <SvgIcon name={el.icon} />
                </div>
                <span>{el.name}</span>
                { el.haveAdd &&
                  <div className="user-menu__add">
                    <div className="icon-add">
                      <SvgIcon name="plus" />
                    </div>
                  </div>
                }
                { el.haveCounter &&
                  <div className="user-menu__counter">
                    <span>14</span>
                  </div>
                }
              </NavLink>
            </li>
          )
        })}

      </ul>
    )
  }
}

export default UserMenu
