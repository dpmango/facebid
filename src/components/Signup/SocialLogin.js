import React, {Component} from 'react';
import { connect } from 'react-redux';
import SvgIcon from '../Helpers/SvgIcon';

class SocialLogin extends Component{
  constructor(props){
    super(props)
    this.state = {
      provider: null
    }
  }

  socialLoginClick = (provider) => {

  }

  render(){
    const {
      state: {

      }
    } = this

    return(
      <div className="social-login">
        <div className="social-list social-list--wide">
          <div onClick={this.socialLoginClick.bind(this, "facebook")} className="social-btn social-btn--facebook">
            <div className="social-btn__icon">
              <SvgIcon name="facebook" />
            </div>
            <span>Facebook</span>
          </div>
          <div onClick={this.socialLoginClick.bind(this, "vkontakte")} className="social-btn social-btn--vkontakte">
            <div className="social-btn__icon">
              <SvgIcon name="vkontakte" />
            </div>
            <span>Vkontakte</span>
          </div>
          <div onClick={this.socialLoginClick.bind(this, "instagram")} className="social-btn social-btn--instagram">
            <div className="social-btn__icon">
              <SvgIcon name="instagram" />
            </div>
            <span>Instagram</span>
          </div>
          <div onClick={this.socialLoginClick.bind(this, "twitter")} className="social-btn social-btn--twitter">
            <div className="social-btn__icon">
              <SvgIcon name="twitter" />
            </div>
            <span>Twitter</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);
