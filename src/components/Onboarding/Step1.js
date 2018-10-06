import React, {Component} from 'react';
import Image from 'components/Helpers/Image';

class Step1 extends Component{
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
            <span className="is-active"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="onboarding__title">Создавайте собственные  события</div>
          <div className="onboarding__description">
            Создавайте свои собственные события, собирайте компании друзей или незнакомцев, чтобы вместе исследовать мир в поисках новых ощущений
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
          <div className="onboarding__wawy">
            <div className="onboarding__waves">
              <div className="onboarding__wave onboarding__wave--middle"></div>
              <div className="onboarding__wave onboarding__wave--top"></div>
            </div>
            <div className="onboarding__wawy-center">
              <Image folder="system" file="onboardingPlus.png" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Step1
