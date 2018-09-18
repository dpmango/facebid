import React, {Component} from 'react';
import { connect } from 'react-redux';
import SvgIcon from '../Helpers/SvgIcon';
import { closeModal } from '../../actions/modal';

class NoNotifications extends Component{
  render(){
    return(
      <div className="modal__content">
        <div className="centered-info centered-info--modal">
          <div className="centered-info__holder t-center">
            <SvgIcon name="notification-blank" />
            <div className="h4-title">Уведомления отсутствуют</div>
            <p className="t-primary">Подписывайтесь на людей, отправляйте заявки на события и создавайте свои для получения новых уведомлений</p>
            <button
              onClick={this.props.closeModal}
              className="btn btn-primary">
              Искать события
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(NoNotifications);
