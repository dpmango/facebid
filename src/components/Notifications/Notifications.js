import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import NoNotifications from './NoNotifications';
import DisabledNotificaitons from './DisabledNotificaitons';
import { closeModal } from '../../actions/modal';

class Notifications extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'notifications',
      // state influence componenets render (not, blank, disabled)
      notifications: false // types arr, [] arr, false
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  render(){
    const {
      state: {
        modalName, notifications
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
        {notifications.length > 0 &&
          <React.Fragment>
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
          </React.Fragment>
        }
        {notifications.length === 0 &&
          <NoNotifications />
        }
        {notifications === false &&
          <DisabledNotificaitons />
        }
      </Modal>
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