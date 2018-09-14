import React, {Component} from 'react';
import SvgIcon from '../Helpers/SvgIcon';

class HeadVerifications extends Component{
  constructor(){
    super()

    this.state = {
      isVerificationsOpened: false
    }
  }

  openVerifications = () => {
    this.setState({ isVerificationsOpened: true })
  }

  closeVerifications = () => {
    this.setState({ isVerificationsOpened: false })
  }

  render(){
    const {
      isVerificationsOpened
    } = this.state

    const providers = [
      {status: true, name: "facebook"},
      {status: false, name: "vkontakte"},
      {status: false, name: "twitter"},
      {status: false, name: "instagram"},
      {status: false, name: "phone"},
      {status: false, name: "credit-card"},
    ]

    return(
      <React.Fragment>
        { !isVerificationsOpened ?
          <button
            className="p-head__top-cta btn btn-primary btn--iconed"
            onClick={this.openVerifications}>
            <SvgIcon name="user" />
            <span>Верифицировать</span>
          </button>
          :
          <div className="verifications">
            { providers.map(provider => (
              <Provider verified={provider.status} provider={provider.name} />
            ))}
            <button
              className="btn btn-circle"
              onClick={this.closeVerifications}>
              <SvgIcon name="close" />
            </button>
          </div>
        }

      </React.Fragment>
    )
  }
}

class Provider extends Component{
  constructor(props){
    super(props)

    this.state = {
      isVerified: props.verified
    }
  }

  verifyProvider = () => {
    // TODO API AUTH
    // refactor to common componenet with oAuth

    this.setState({isVerified: true})
  }

  render(){

    const {
      props: {provider},
      state: {isVerified}
    } = this

    return(
      <div
        onClick={this.verifyProvider}
        className={`v-btn v-btn--${provider}` + (isVerified ? " is-verified" : "")}>
        <SvgIcon name={provider} />
        {isVerified &&
          <div className="v-btn__verified">
            <SvgIcon name="checkmark" />
          </div>
        }
      </div>
    )
  }
}
export default HeadVerifications
