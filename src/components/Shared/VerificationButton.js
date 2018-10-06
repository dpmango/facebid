import React, {Component} from 'react';
import SvgIcon from '../Helpers/SvgIcon';

class VerificationButton extends Component{
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

export default VerificationButton
