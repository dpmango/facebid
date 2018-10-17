import React, {Component, Fragment} from 'react';
import SvgIcon from '../Helpers/SvgIcon';
import SimpleInput from '../Forms/SimpleInput';

class HeadBottomButtons extends Component {
  constructor(){
    super()

    this.state = {
      chatEnabled: false,
      chatText: ""
    }
  }

  toggleChat = () => {
    this.setState({
      chatEnabled: !this.state.chatEnabled
    })
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fieldVal});
  }

  sendMessage = () => {
    this.toggleChat()
  }

  render(){
    const {
      props: { isMyProfile, isBlackListed },
      state: { chatEnabled, chatText }
    } = this

    return(
      <div className="p-head__bottom-cta">
        { isMyProfile &&
          <button
            onClick={this.props.onEnableEditMode}
            className="btn btn-primary btn--iconed">
            <SvgIcon name="pencil" />
            <span>Редактировать профиль</span>
          </button>
        }
        { !isMyProfile &&
          <Fragment>
            { chatEnabled ?
              <div className="p-head__mini-chat">
                <SimpleInput
                  name="chatText"
                  placeholder="Написать сообщение"
                  icon="sent"
                  value={chatText}
                  iconClickHandler={this.sendMessage}
                  onChangeHandler={this.handleChange} />
                <button
                  className="p-head__mini-chat-close"
                  onClick={this.toggleChat}>
                  <SvgIcon name="close" />
                </button>
              </div>
              :
              <button
                disabled={isBlackListed}
                onClick={this.toggleChat}
                className="btn btn-primary btn--iconed">
                <SvgIcon name="comments" />
                <span>Поболтать</span>
              </button>
            }
            <button
              // onClick={}
              disabled={isBlackListed}
              className="btn btn-primary btn--iconed">
              <SvgIcon name="plus" />
              <span>Пригласить</span>
            </button>
          </Fragment>
        }
      </div>
    )
  }
}

export default HeadBottomButtons
