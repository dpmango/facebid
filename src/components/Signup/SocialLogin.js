import React, {Component} from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import OAuth from '../OAuth/OAuth';
import { SOCIAL_LOGIN_BACKEND_URL } from '../../services/Api'
const socket = io(SOCIAL_LOGIN_BACKEND_URL)

class SocialLogin extends Component{

  render(){
    const providers = ['facebook', 'twitter'] // vkontakte, instagram

    return(
      <div className="social-login">
        <div className="social-list social-list--wide">
          { providers.map(provider =>
            <OAuth
              provider={provider}
              key={provider}
              socket={socket}
            />
          )}
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
