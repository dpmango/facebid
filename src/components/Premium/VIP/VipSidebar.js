import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';

class VipSidebar extends Component{
  render(){

    const list = [
      {
        icon: "arrow-top",
        text: "Одно поднятие каждый день нового события"
      },
      {
        icon: "calendar",
        text: "Участвуй в&nbsp;интересных событиях до&nbsp;50&nbsp;в сутки"
      },
      {
        icon: "email-with-pen",
        text: "Пиши новым людям без ограничений"
      },
      {
        icon: "alert-badge",
        text: "Узнай, кто добавил твое событие в&nbsp;избранное"
      },
      {
        icon: "to-top",
        text: "После публикации событие будет в&nbsp;ТОП под меню"
      },
      {
        icon: "email-event",
        text: "Приглашай на&nbsp;свое событие до&nbsp;50&nbsp;человек в&nbsp;сутки"
      },
      {
        icon: "stat-chart",
        text: "Ты&nbsp;сможешь видеть подробную статистику своего профиля"
      }
    ]
    return(
      <div className="p-sidebar">
        <div className="p-sidebar__head">
          <div className="p-sidebar__icon">
            <SvgIcon name="vip-sidebar" />
          </div>
          <p className="t-secondary">Люди с&nbsp;<strong>VIP аккаунтом </strong> получают полный доступ  ко&nbsp;всем функциям FaceBid</p>
        </div>
        <ul className="p-sidebar__list p-sidebar__list--vip">
          {list.map((el, index) => (
            <li key={index}>
              <div className="p-sidebar__list-icon">
                <SvgIcon name={el.icon} />
              </div>
              <div
                dangerouslySetInnerHTML={{__html: el.text}}
                className="p-sidebar__list-text" />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default VipSidebar;
