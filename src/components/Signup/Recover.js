import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Modal from '../Modal/Modal';
import FormInput from '../Forms/Input';
import { openModal, closeModal } from '../../actions/modal'

class Recover extends Component{
  constructor(){
    super()
    this.state = {
      modalName: 'recover',
      email: ''
    }

    this.formRef = React.createRef();

  }

  hide = () => {
    this.props.closeModal()
  }

  formInvalid = () => {
    this.setState({ formIsValid: false });
  }

  formValid = () => {
    this.setState({ formIsValid: true });
  }

  // submit handler from the form
  handleSubmit = (e) => {
    this.setState({isFormSubmitted: true})
    if ( this.state.formIsValid ){
      this.reocoverPassword();
      this.setState({isFormSubmitted: false}) // reset state here
    }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      this.submitForm();
    }
  }

  // auth passed to redux
  reocoverPassword = () => {
    // const { email } = this.state;
    // api call with recover
    // api
    //   .post(`/recover?email=${email}`)

    this.hide()

    this.props.notify({
      title: 'Пароль сброшен',
      message: 'Проверьте вашу почту для ссылки для подтверждения',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })

  }

  render(){
    const {
      state: {
        modalName, email
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
          <div className="modal__content">
            <div className="recover">

              <div className="recover__head">
                <div className="t-center">
                  <div className="h4-title">Забыли пароль?</div>
                  <div className="t-primary">Введите свой телефон или адрес электронной почты и мы отправим Вам новый пароль</div>
                </div>
              </div>

              <Formsy
                className="recover__form"
                onSubmit={this.handleSubmit}
                onValid={this.formValid}
                onInvalid={this.formInvalid}
                ref={this.formRef} >
                <FormInput
                  name="email"
                  placeholder="E–mail или номер телефона"
                  value={email}
                  validations="isEmail"
                  validationErrors={{
                    isEmail: "Неверный формат email",
                    isDefaultRequiredValue: 'Заполните email'
                  }}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler}
                  required />

                <div className="recover__cta">
                  <button className="btn btn-primary" type="submit">Сбросить пароль</button>
                  <a
                    onClick={this.props.openModal.bind(this, 'login')}
                    className="t-link">Вернуться ко входу</a>
                </div>
              </Formsy>
            </div>

          </div>
      </Modal>
    )
  }
}


Recover.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  notify: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal()),
  notify: (data) => dispatch(notify(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recover);
