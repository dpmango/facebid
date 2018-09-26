import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from 'components/Helpers/SvgIcon';

class EmptyMessages extends Component {
  render(){
    return(
      <div className="centered-info centered-info--modal">
        <div className="centered-info__holder">
          <SvgIcon name="paper-plane" />
          <div className="h4-title">Чаты отсутствуют</div>
          <p className="t-primary">В настоящее время у Вас нет чатов.</p>
          <p className="t-primary">Участвуйте в событиях и отправляйте запросы на переписку для того, чтобы начать общение</p>
          <Link
            to="/events"
            className="btn btn-primary">
            Искать события
          </Link>
        </div>
      </div>
    )
  }
}

export default EmptyMessages
