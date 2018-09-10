import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Modal from '../Modal/Modal';
import { logOut } from '../../actions/user';
import { closeModal } from '../../actions/modal';

class Logout extends Component{
  constructor(){
    super()
    this.state = {
      modalName: 'logout'
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  // auth passed to redux
  logOut = () => {
    // TODO - descroy cookie on server
    this.props.logOut();
    this.hide()
    this.props.notify({
      title: 'Выход из системы',
      message: 'Вы успешно вышли из системы',
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
              <div className="h4-title t-center">Вы действительно <br/> хотите выйти?</div>
              <div className="modal-logout__btns">
                <button
                  onClick={this.logOut}
                  className="btn btn-primary">Да</button>
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


Logout.propTypes = {
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  logOut: () => dispatch(logOut()),
  notify: (data) => dispatch(notify(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
