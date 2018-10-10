import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import Select from 'react-select';
import { notify } from 'reapop';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import FormInput from '../Forms/Input';
import { closeModal } from 'actions/modal';
import MapArrToSelect from 'helpers/MapArrToSelect';


class Abuse extends Component{
  constructor(props){
    super(props)

    this.initialState = {
      modalName: 'abuse',
      reason: '',
      description: '',
      url: ''
    }

    this.state = this.initialState

    this.formRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.modalOptions && (nextProps.modalOptions.url !== prevState.url)) {
      return { url: nextProps.modalOptions.url};
    } else {
      return null;
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
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
      message: 'Спасибо, жалоба успешно оправлена',
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
        modalName, reason, description
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
            Пожаловаться
          </div>
        </div>
        <div className="modal__content">
          <Formsy
            className="modal-abuse-form ui-groups-margin"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef}>
            <div className="ui-group">
              <label htmlFor="">Укажите причину:</label>
              <Select
                name="reason"
                searchable={false}
                noResultsText="Не найдено"
                autosize={false}
                value={reason}
                onChange={(e) => this.handleSelectChange(e, "reason")}
                placeholder="Выберите причину жалобы"
                options={MapArrToSelect(
                  ["Неоригинальный контент",
                   "Спам",
                   "Рекламный пост"]
                )}/>
            </div>
            <FormInput
              name="description"
              type="textarea"
              rows={[3,10]}
              label="Комментарий:"
              placeholder="Введите статус"
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
              <SvgIcon name="email-with-pen" />
              <span>Отправить жалобу</span>
            </button>
          </Formsy>
        </div>


      </Modal>
    )
  }
}

Abuse.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Abuse);
