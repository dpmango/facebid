import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import { logOut } from '../../actions/user';
import { closeModal, openModal } from '../../actions/modal';

class DeleteAccount extends Component{
  constructor(){
    super()
    this.state = {
      modalName: 'delete-account'
    }
  }

  hide = () => {
    // todo refactor throug redux saving prev value and pass exra flag
    // redirectBack
    this.props.openModal('settings')
    // this.props.closeModal()
  }

  // auth passed to redux
  DeleteAccount = () => {
    // TODO - descroy cookie on server
    // this.props.logOut();
    this.hide()

    // TODO - account removal
    this.props.notify({
      title: 'Аккаунт удален',
      message: 'Спасибо что были с нами RIP',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })
  }

  render(){
    const {
      state: { modalName },
      props: { activeModal }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        containerClass="modal__container--small"
        onHide={this.hide}
        >
          <div className="modal__content">
            <div className="modal-logout">
              <div className="t-center">
                <SvgIcon name="tombstone" />
                <div className="h4-title">Вы действительно хотите  <br/> удалить аккаунт?</div>
                <p className="t-primary">Данное действие является необратимым.</p>
              </div>

              <div className="modal-logout__btns">
                <button
                  onClick={this.DeleteAccount}
                  className="btn btn-primary btn-primary--red">Удалить аккаунт</button>
                <button
                  onClick={this.hide}
                  className="btn btn-outline">Нет</button>
              </div>
            </div>
          </div>
      </Modal>
    )
  }
}


DeleteAccount.propTypes = {
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (data) => dispatch(openModal(data)), 
  notify: (data) => dispatch(notify(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
