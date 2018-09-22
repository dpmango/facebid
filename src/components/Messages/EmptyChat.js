import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';

class EmptyChat extends Component{
  render(){
    return(
      <div className="centered-info centered-info--chat">
        <div className="centered-info__holder">
          <SvgIcon name="chat-empty" />
          <p className="t-primary">Выберите чат чтобы <br/> начать общение</p>
        </div>
      </div>
    )
  }
}

export default EmptyChat
