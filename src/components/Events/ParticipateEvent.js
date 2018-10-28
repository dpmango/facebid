import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { notify } from 'reapop';
import api from 'services/Api';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import Image from '../Helpers/Image';
import EventCardDate from './Card/EventCardDate';
import FormInput from '../Forms/Input';
import { closeModal } from 'actions/modal';

class ParticipateEvent extends Component{
  constructor(props){
    super(props)

    this.initialState = {
      modalName: 'participate',
      description: '',
      eventData: null,
      eventId: ''
    }

    this.state = this.initialState

    this.formRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState){
    // console.log(nextProps.modalOptions, prevState)
    if (nextProps.modalOptions && (nextProps.modalOptions.eventId !== prevState.eventId)) {
      return {eventId: nextProps.modalOptions.eventId}
    } else {
      return null;
    }
  }

  componentDidMount(){
    this.setState(this.initialState, () => this.hide()) // don't reopen on page reload!
    this.getEventInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.eventId !== this.state.eventId){
      this.getEventInfo()
    }
  }

  getEventInfo = () => {
    const {eventId} = this.state;
    if (!eventId) return

    api
      .get(`events/${eventId}`)
      .then(res => {
        console.log('event res', res)
        this.setState({
          eventData: res.data
        })
      })
      .catch(err => {
        console.log('error on GET events', err)
      })
  }

  hide = () => {
    this.props.closeModal()
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fieldVal});
  }

  // FORM (EDITABLE FUNCTIONS)
  formInvalid = () => {
    this.setState({ formIsValid: false });
  }

  formValid = () => {
    this.setState({ formIsValid: true });
  }

  // submit handler from the form
  handleSubmit = (e) => {
    console.log('form is submited')
    this.setState({isFormSubmitted: true})
    if ( this.state.formIsValid ){
      this.formSubmited()
      this.setState({isFormSubmitted: false})
    }
  }


  formSubmited = () => {
    // TODO + api call
    // and this.state.url as pseudo-hidden field
    this.props.notify({
      title: 'Заявка отправлена',
      message: 'Спасибо, заявка на участие в событии отправлена',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 3500,
    })

    this.props.closeModal();

    this.setState(this.initialState)
  }

  render(){
    const {
      state: {
        modalName, description, eventData
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}
        containerClass="modal__container--small"
        >
        <div className="modal__header">
          <div className="h4-title">
            Принять участие в событии
          </div>
        </div>
        <div className="modal__content">
          <div className="e-short">
            <div className="e-short__media">
              { eventData &&
                <Image folder="events" file={eventData.images[0]} />
              }
            </div>
            <div className="e-short__contents">
              { eventData &&
                <Fragment>
                  <div className="e-card__head">
                    <div className="e-card__title">{eventData.name}</div>
                    <div className="e-card__event-line">
                      { eventData.from &&
                        <Fragment>
                          <span>{eventData.from}</span>
                          <i className="icon icon-plane"></i>
                        </Fragment>
                      }
                      { eventData.to && <span>{eventData.to}</span> }
                      { eventData.location && <span>{eventData.location}</span>}
                    </div>
                    <EventCardDate
                      baseClass="e-card__date"
                      date={eventData.date} />
                  </div>
                  <div className="e-short__desc">{eventData.desc}</div>
                </Fragment>
              }
            </div>
          </div>
          <Formsy
            className="modal-invite-form ui-groups-margin"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef}>
            <FormInput
              name="description"
              type="textarea"
              rows={[3,10]}
              label="Текст сообщения:"
              placeholder="Введите сообщение"
              value={description}
              validationErrors={{
                isDefaultRequiredValue: "Заполните это поле"
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required />

            <button
              type="submit"
              className="btn btn-primary btn--iconed">
              <SvgIcon name="sent" />
              <span>Отправить заявку</span>
            </button>
          </Formsy>
        </div>

      </Modal>
    )
  }
}

ParticipateEvent.propTypes = {
  closeModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal,
  modalOptions: state.modal.modalOptions
});

const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipateEvent);
