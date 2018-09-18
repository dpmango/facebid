import React, {Component} from 'react';
import { connect } from 'react-redux';
import SvgIcon from '../Helpers/SvgIcon';
import { closeModal, openModal } from '../../actions/modal';

class DisabledNotificaitons extends Component{
  render(){
    return(
      <div className="modal__content">
        <div className="centered-info centered-info--modal">
          <div className="centered-info__holder t-center">
            <SvgIcon name="notification-disabled" />
            <div className="h4-title">Уведомления выключены</div>
            <p className="t-primary">В настройках профиля отстуствуют включенные уведомления. Для получения уведомлений включите необходимые оповещения</p>
            <button
              onClick={this.props.openModal.bind(this, 'settings')}
              className="btn btn-primary">
              Перейти в настройки
            </button>
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (data) => dispatch(openModal(data))
});

export default connect(null, mapDispatchToProps)(DisabledNotificaitons);
