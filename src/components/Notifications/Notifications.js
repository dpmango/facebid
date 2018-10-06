import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../Modal/Modal';
// import SvgIcon from '../Helpers/SvgIcon';
import Notification from './Notification';
import NoNotifications from './NoNotifications';
import api from 'services/Api';
import DisabledNotificaitons from './DisabledNotificaitons';
import { closeModal } from 'actions/modal';

class Notifications extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'notifications',
      // state influence componenets render (not, blank, disabled)
      notifications: [] // types arr, [] arr, false
      // TODO - parse initial
    }
  }

  componentDidMount(){
    this.getNotifications()
  }

  _tempToggleNotifications = (a) => {
    switch (a) {
      case 1:
        this.getNotifications()
        break;
      case 2:
        this.setState({notifications: []})
        break;
      case 3:
        this.setState({notifications: false})
        break;
      default:
        return null
    }
  }

  getNotifications = () => {
    api
      .get("notifications")
      .then(res => {
        this.setState({
          notifications: res.data
        })
      })
      .catch(err => {
        console.log('some error happes')
      })
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
        containerClass="modal__container--scroller"
        onHide={this.hide}>
        {notifications.length > 0 &&
          <Fragment>
            <div className="modal__header">
              <div className="h4-title">
                Уведомления
              </div>
            </div>
            <PerfectScrollbar
              className="scrollbar-blue scrollbar-blue--modal modal__content modal__content--scrollable"
              option={{
                wheelSpeed: 1,
                wheelPropagation: false,
                suppressScrollX: true}}>
              <div className="ntf">
                {notifications.map(ntf => (
                  <Notification
                    key={ntf.id}
                    id={ntf.id}
                    user={ntf.user}
                    data={ntf.data}
                    type={ntf.type}
                    timestamp={ntf.timestamp} />
                ))}
              </div>
            </PerfectScrollbar>
          </Fragment>
        }
        {notifications.length === 0 &&
          <NoNotifications />
        }
        {notifications === false &&
          <DisabledNotificaitons />
        }
        <div className="ntf__tmp-buttons ui-buttons-group">
          <button
            onClick={this._tempToggleNotifications.bind(this, 1)}
            className="btn btn-primary">
            Есть
          </button>
          <button
            onClick={this._tempToggleNotifications.bind(this, 2)}
            className="btn btn-primary">
            Пусто
          </button>
          <button
            onClick={this._tempToggleNotifications.bind(this, 3)}
            className="btn btn-primary">
            Отключены
          </button>
        </div>
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
