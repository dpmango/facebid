import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import { closeModal } from '../../actions/modal';

class Notifications extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'notifications'
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  render(){
    const {
      state: {
        modalName
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}
        >
        <div className="modal__header">
          <div className="h4-title">
            Уведомления
          </div>
        </div>
        <div className="modal__content">
          <div className="ntf">
            <div className="notification">
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

class ShareProvider extends Component{

  shareAction = () => {

  }

  render(){
    const {
      props: { provider, name }
    } = this

    return(
      <div
        onClick={this.shareAction}
        className={`share__element share__element--${provider}`}>
        <div className="share__icon">
          <SvgIcon name={provider} />
        </div>
        <div className="share__name">
          {name}
        </div>
      </div>
    )
  }
}

Notifications.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
