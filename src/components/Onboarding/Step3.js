import React, {Component} from 'react';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Image from 'components/Helpers/Image';

class Step3 extends Component{
  constructor(){
    super();

    this.state ={
      didMount: false,
      isTransitioningNext: false
    }
  }

  enableNotifications = () => {
    // html api things
    if (("Notification" in window)) {

      if (Notification.permission === "granted") {
        new Notification("Уведомления уже включены");
        this.nextStep();
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission((permission) => {
          if (permission === "granted") {
            this.nextStep();
            new Notification("Спасибо, уведомления включены!");
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
      this.nextStep();
    }

  }
  nextStep = () => {
    this.setState({isTransitioningNext: true})

    setTimeout(()=>{
      this.props.nextStep()
      this.setState({isTransitioningNext: false})
    }, 250)
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({didMount: true})
    }, 250)
  }
  
  render(){
    const {
      isTransitioningNext, didMount
    } = this.state

    return(
      <div
        className={"onboarding__wrapper" +
        (didMount ? " is-current" : "") +
        (isTransitioningNext ? " is-transitioning" : "")}>
        <div className="onboarding__left">
          <div className="onboarding__counter">
            <span></span>
            <span></span>
            <span className="is-active"></span>
            <span></span>
          </div>
          <div className="onboarding__title">Включите уведомления в браузере</div>
          <div className="onboarding__description">
            Подтвердите оповещения в браузере чтобы оставаться в курсе всех происходящих событий. Данную функцию в дальнейшем можно отключить.
          </div>
          <div className="onboarding__cta">
            <div className="ui-buttons-group">
              <button
                onClick={this.enableNotifications}
                className="btn btn-primary">
                Продолжить
              </button>
              <button
                onClick={this.nextStep}
                className="btn btn-primary btn-primary--invis">
                Пропустить
              </button>
            </div>
          </div>
        </div>
        <div className="onboarding__right">
          <Image folder="system" file="onboardingNotifications.png" />
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data))
});

export default connect(null, mapDispatchToProps)(Step3);
