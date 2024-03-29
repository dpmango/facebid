import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import FormInput from '../Forms/Input';
import Checkbox from '../Forms/Checkbox';
import SocialLogin from './SocialLogin';
import { loginRequest, clearAuthError } from 'actions/user';
import { openModal, closeModal } from 'actions/modal';

class Login extends Component{
  constructor(){
    super()
    this.state = {
      modalName: 'login',
      email: 'test@mail.com',
      password: '123456',
      remember: false
    }

    this.formRef = React.createRef();
  }

  componentDidMount(){
    this.props.clearError()
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
      this.loginUser();
      this.setState({isFormSubmitted: false}) // reset state here
    }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fieldVal});

    if ( this.props.loginError ){
      this.props.clearError()
    }
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      // this.submitForm();
    }
  }

  toggleRemember = () => {
    this.setState({
      remember: !this.state.remember
    })
  }

  // auth passed to redux
  loginUser = () => {
    const { email, password, remember } = this.state;

    this.props.logIn({
      email, password, remember
    });
  }

  render(){
    const {
      state: {
        modalName, email, password, remember
      },
      props: {
        activeModal, loginError
      }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}
        >
          <div className="modal__header">
            <div className="h4-title">
              Вход на сайт
            </div>
          </div>
          <div className="modal__content">
            <div className="t-primary">Введите свои данные или <a onClick={this.props.openModal.bind(this, 'signup')}>зарегистрируйтесь</a>, <br /> если вы здесь впервые.</div>
            <div className="modal-auth">
              <div className="modal-auth__left">
                <Formsy
                  className="login__form"
                  onSubmit={this.handleSubmit}
                  onValid={this.formValid}
                  onInvalid={this.formInvalid}
                  ref={this.formRef} >
                  {loginError &&
                    <div className="ui-group ui-group--row">
                      <label htmlFor=""></label>
                      <div className="ui-error-message">{loginError}</div>
                    </div>
                  }
                  <FormInput
                    name="email"
                    label="Логин:"
                    placeholder="E–mail или номер телефона"
                    extraClass="ui-group--row"
                    value={email}
                    validations="isEmail"
                    validationErrors={{
                      isEmail: "Неверный формат email",
                      isDefaultRequiredValue: 'Заполните email'
                    }}
                    onChangeHandler={this.handleChange}
                    onKeyHandler={this.keyPressHandler}
                    required />
                  <FormInput
                    name="password"
                    type="password"
                    label="Пароль:"
                    placeholder="Введите пароль"
                    extraClass="ui-group--row"
                    value={password}
                    validationErrors={{
                      isDefaultRequiredValue: 'Заполните пароль'
                    }}
                    onChangeHandler={this.handleChange}
                    onKeyHandler={this.keyPressHandler}
                    required />
                  <div className="login__remember">
                    <Checkbox
                      name="remember"
                      text="Запомнить меня"
                      clickHandler={this.toggleRemember}
                      value={remember}
                    />
                  </div>
                  <div className="login__cta">
                    <button className="btn btn-primary" type="submit">Войти</button>
                    <a
                      onClick={this.props.openModal.bind(this, 'recover')}
                      className="t-link">Не помню пароль</a>
                  </div>
                  <div className="login__rules">Пользуясь сайтом Вы соглашаетесь с Пользовательским  соглашением и Политикой конфиденциальности</div>
                </Formsy>
              </div>

              <div className="modal-auth__right">
                <SocialLogin />
              </div>

            </div>
          </div>
      </Modal>
    )
  }
}


Login.propTypes = {
  logIn: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal,
  loginError: state.user.loginError
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (data) => dispatch(loginRequest(data)),
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal()),
  clearError: () => dispatch(clearAuthError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
