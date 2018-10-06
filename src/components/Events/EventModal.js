import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'services/Api';
import Modal from '../Modal/Modal';
import Loading from '../Helpers/Loading';
import EventCard from './Card/EventCard';
import { closeModal } from 'actions/modal';

class EventModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'event',
      eventId: null,
      eventData: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.modalOptions && (nextProps.modalOptions.eventId !== prevState.eventId)) {
      return { eventId: nextProps.modalOptions.eventId};
    } else {
      return null;
    }
  }

  componentDidMount(){
    this.getEvent(this.state.eventId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.eventId !== this.state.eventId){
      this.getEvent(this.state.eventId)
    }
  }

  getEvent = (id) => {
    // api request
    const endpoint = `events?id=${id}`
    api
      .get(endpoint)
      .then(res => {
        this.setState({eventData: res.data[0]})
      })
      .catch(err => {
        console.log(`Something wrong happens - ${err.data}`, err)
      })
  }

  hide = () => {
    this.props.closeModal()
  }

  render(){
    const {
      state: {
        modalName, eventData
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        protected={true}
        isActive={activeModal === modalName}
        onHide={this.hide}>
        { !eventData ?
          <Loading />
          :
          <EventCard
            // type={type}
            data={eventData} />
        }

      </Modal>
    )
  }
}

EventModal.propTypes = {
  activeModal: PropTypes.string,
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal,
  modalOptions: state.modal.modalOptions
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventModal);
