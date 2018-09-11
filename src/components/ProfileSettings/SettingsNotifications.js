import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Tumbler from '../Forms/Tumbler';

class SettingsNotifications extends Component{
  constructor(){
    super()

    this.state = {
      messages: true, // Сообщения
      visitors: true, // Посетители
      subscribed: true, // На Вас подписались
      subscribeRequest: false, // Запросы на перписку
      eventRequest: false, // Запросы на Ваши события:
      eventComments: true, // Комментарии к Вашим событиям
      eventBookmarked: true, // Добавили Ваше событие в «Избранное»
      eventRequestConfirmed: false, // Подтвердили Ваш запрос на событие
      eventInvited: false, // Пригласили Вас на событие
      eventNew: true, // Ваши подписки создали новое событие:
      eventNewPhotos: true, // Ваши подписки добавили новые фотографии:

      browserEnabled: false, // Показывать мговенные уведомления:
      browserSound: true, // Включить звуковые оповещения:
    }
  }

  selectToggle = (name) => {
    this.setState({
      [name]: !this.state[name]
    })

    if ( name === "browserEnabled" ){
      this.exampleNotification()
    }
  }

  exampleNotification = () => {

    if (("Notification" in window)) {

      if (Notification.permission === "granted") {
        var notification = new Notification("Тест уведомления");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission((permission) => {
          if (permission === "granted") {
            var notification = new Notification("Спасибо, уведомления включены!");
          }
        });
      }

    } else{
      this.props.notify({
        title: 'Ошибка',
        message: 'Ваш браузер не поддерживает уведомления',
        status: 'danger', // default, info, success, warning, error
        dismissible: true,
        dismissAfter: 2000,
      })
    }

  }


  render(){

    const {
      state: {
        messages,
        visitors,
        subscribed,
        subscribeRequest,
        eventRequest,
        eventComments,
        eventBookmarked,
        eventRequestConfirmed,
        eventInvited,
        eventNew,
        eventNewPhotos,
        browserEnabled,
        browserSound
      }
    } = this

    return(
      <React.Fragment>
        <div className="h4-title">Основные</div>
        <div className="nt">
          <div className="nt__grid">
            <NotificationRow
              name="Сообщения:"
              value={messages}
              clickHandler={this.selectToggle.bind(this, "messages")} />
            <NotificationRow
              name="Посетители:"
              value={visitors}
              clickHandler={this.selectToggle.bind(this, "visitors")} />
            <NotificationRow
              name="На Вас подписались:"
              value={subscribed}
              clickHandler={this.selectToggle.bind(this, "subscribed")} />
            <NotificationRow
              name="Запросы на перписку:"
              value={subscribeRequest}
              clickHandler={this.selectToggle.bind(this, "subscribeRequest")} />
            <NotificationRow
              name="Запросы на Ваши события:"
              value={eventRequest}
              clickHandler={this.selectToggle.bind(this, "eventRequest")} />
            <NotificationRow
              name="Комментарии к Вашим событиям:"
              value={eventComments}
              clickHandler={this.selectToggle.bind(this, "eventComments")} />
            <NotificationRow
              name="Добавили Ваше событие в «Избранное»:"
              value={eventBookmarked}
              clickHandler={this.selectToggle.bind(this, "eventBookmarked")} />
            <NotificationRow
              name="Подтвердили Ваш запрос на событие:"
              value={eventRequestConfirmed}
              clickHandler={this.selectToggle.bind(this, "eventRequestConfirmed")} />
            <NotificationRow
              name="Пригласили Вас на событие:"
              value={eventInvited}
              clickHandler={this.selectToggle.bind(this, "eventInvited")} />
            <NotificationRow
              name="Ваши подписки создали новое событие:"
              value={eventNew}
              clickHandler={this.selectToggle.bind(this, "eventNew")} />
            <NotificationRow
              name="Ваши подписки добавили новые фотографии:"
              value={eventNewPhotos}
              clickHandler={this.selectToggle.bind(this, "eventNewPhotos")} />

          </div>
        </div>

        {/* Next section */}
        <div className="h4-title">Уведомления в браузере</div>
        <div className="nt">
          <div className="nt__grid">
            <NotificationRow
              name="Показывать мговенные уведомления:"
              value={browserEnabled}
              clickHandler={this.selectToggle.bind(this, "browserEnabled")} />
            <NotificationRow
              name="Включить звуковые оповещения:"
              value={browserSound}
              clickHandler={this.selectToggle.bind(this, "browserSound")} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

class NotificationRow extends Component {
  render(){
    const { name, value } = this.props
    return(
      <div className="nt__col">
        <div className="ui-toggle-row">
          <label htmlFor="">{name}</label>
          <Tumbler
            value={value}
            clickHandler={this.props.clickHandler} />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNotifications);
