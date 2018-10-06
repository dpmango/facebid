import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import throttle from 'lodash/throttle'
import Modal from '../Modal/Modal';
import SubscribersList from 'components/Profile/SubscribersList';
// import api from 'services/Api';
import { closeModal } from 'actions/modal';

class Subscribers extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'subscribers-list'
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  onScrollContainer = (container) => {
    const scrollDistance = container.scrollTop
    const containerHeight = container.querySelector('.is-active').offsetHeight

    const almostBottom = scrollDistance > (containerHeight - window.innerHeight - 300)

    if ( almostBottom ){
      this.subscribersRef.getUserList()
    }
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
        protected={true}
        isActive={activeModal === modalName}
        containerClass="modal__container--small modal__container--scroller"
        onHide={this.hide} >
        <PerfectScrollbar
          className="scrollbar-blue scrollbar-blue--modal modal__content modal__content--scrollable"
          onScrollY={throttle(this.onScrollContainer, 100)}
          option={{
            wheelSpeed: 1,
            wheelPropagation: false,
            suppressScrollX: true,
          }}>
          <div
            className={"modal__tab-panel is-active"}>
            <SubscribersList
              onRef={ref => (this.subscribersRef = ref)}
              type="subscribers" />
          </div>
        </PerfectScrollbar>

      </Modal>
    )
  }
}

Subscribers.propTypes = {
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribers);
