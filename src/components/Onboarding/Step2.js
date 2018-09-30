import React, {Component} from 'react';
import Image from 'components/Helpers/Image';

class Step2 extends Component{
  constructor(){
    super();

    this.state ={
      didMount: false,
      isTransitioningNext: false
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
            <span className="is-active"></span>
            <span></span>
            <span></span>
          </div>
          <div className="onboarding__title">Приглашайте друзей  из социальных сетей</div>
          <div className="onboarding__description">
            Приглашайте друзей, где бы они не находились.  Не имеет значения, создан ли их аккаунт в сервисе или нет, они смогут принять Ваше приглашение.
          </div>
          <div className="onboarding__cta">
            <button
              onClick={this.nextStep}
              className="btn btn-primary">
              Продолжить
            </button>
          </div>
        </div>
        <div className="onboarding__right">
          <Image folder="system" file="onboardingSocial.png" />
        </div>
      </div>
    )
  }
}

export default Step2
