import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { notify } from 'reapop';
import api from 'services/Api';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import UserInfo from '../Shared/UserInfo';
import FormInput from '../Forms/Input';
import { closeModal } from 'actions/modal';

class Invite extends Component{
  constructor(props){
    super(props)

    this.initialState = {
      modalName: 'invite',
      description: '',
      user: null,
      eventId: '',
      userId: ''
    }

    this.state = this.initialState

    this.formRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.modalOptions && (nextProps.modalOptions.userId !== prevState.userId)) {
      return {
        userId: nextProps.modalOptions.userId,
        eventId: nextProps.modalOptions.eventId
      };
    } else {
      return null;
    }
  }

  componentDidMount(){
    this.setState(this.initialState, () => this.hide()) // don't reopen on page reload!
    this.getUserInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userId !== this.state.userId){
      this.getUserInfo()
    }
  }

  getUserInfo = () => {
    const {userId, eventId} = this.state;
    if (!userId || !eventId) return

    api
      .get(`users/${userId}`)
      .then(res => {
        console.log('users res', res)
        this.setState({
          user: {
            avatar: res.data.avatar,
            username: res.data.username,
            age: 23,
            distance: "16 км от Вас"
          }
        })
      })
      .catch(err => {
        console.log('error on GET users', err)
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
      title: 'Отправлено',
      message: 'Спасибо, приглашение успешно отправлено',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })

    this.props.closeModal();

    this.setState(this.initialState)
  }

  render(){
    const {
      state: {
        modalName, description, user
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
            Пригласить на событие
          </div>
        </div>
        <div className="modal__content">
          <Formsy
            className="modal-invite-form ui-groups-margin"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef}>
            <div className="ui-group">
              <UserInfo user={user} />
            </div>
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
              <SvgIcon name="profile-add" />
              <span>Пригласить</span>
            </button>
          </Formsy>
        </div>


      </Modal>
    )
  }
}

Invite.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
