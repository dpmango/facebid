import React, {Component} from 'react';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import FormInput from '../Forms/Input';
import SocialLogin from './SocialLogin';

class Signup extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalOpened: true,
      nickname: '',
      email: '',
      password: '',
      password_repeat: '',

    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  show = () => {
    this.setState({
      modalOpened: true
    })
  }

  hide = () => {
    this.setState({
      modalOpened: false
    })
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
      this.signupUser();
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

  signupUser = () => {
    // auth
    alert('TODO - auth')
  }

  render(){
    const {
      state: {
        nickname, email, password, password_repeat
      }
    } = this

    return(
      <Modal
        isActive={this.state.modalOpened}
        onHide={this.hide}
        >
          <div className="modal__header">
            <div className="modal__header-name">
              Регистрация
            </div>
          </div>
          <div className="modal__content">
            <div className="modal__intro">Начинте общение уже сейчас! Получите доступ  <br/>к 99 481 объявлениям в 2 клика!</div>
            <div className="modal-auth">
              <div className="modal-auth__left">
                <Formsy
                  className="signup__form"
                  onSubmit={this.handleSubmit}
                  onValid={this.formValid}
                  onInvalid={this.formInvalid}
                  ref={this.formRef}
                >
                  <FormInput
                    name="nickname"
                    type="text"
                    label="Никнейм:"
                    placeholder="Например, Adelina491"
                    extraClass="ui-group--row"
                    value={nickname}
                    validationErrors={{
                      isDefaultRequiredValue: 'Заполните никнейм'
                    }}
                    onChangeHandler={this.handleChange}
                    onKeyHandler={this.keyPressHandler}
                    required />
                  <FormInput
                    name="email"
                    label="Email:"
                    placeholder="Введите e-mail"
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
                  <FormInput
                    name="password_repeat"
                    type="password"
                    label="Повторите пароль:"
                    placeholder="Введите пароль"
                    extraClass="ui-group--row"
                    value={password_repeat}
                    validationErrors={{
                      isDefaultRequiredValue: 'Заполните пароль'
                    }}
                    onChangeHandler={this.handleChange}
                    onKeyHandler={this.keyPressHandler}
                    required />
                  <div className="signup__cta">
                    <button className="btn btn-primary" type="submit">Зарегистрироваться</button>
                  </div>
                  <div className="signup__rules">Пользуясь сайтом Вы соглашаетесь с Пользовательским соглашением и Политикой конфиденциальности</div>
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
