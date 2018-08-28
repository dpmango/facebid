import React, {Component} from 'react';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import FormInput from '../Forms/Input';
import Checkbox from '../Forms/Checkbox';
import SocialLogin from './SocialLogin';

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalOpened: false,
      email: '',
      password: '',
      remember: false
    }

    this.formRef = React.createRef();

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
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      this.submitForm();
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
        email, password, remember
      }
    } = this

    return(
      <Modal
        isActive={this.state.modalOpened}
        onHide={this.hide}
        >
          <div className="modal__header">
            <div className="h4-title">
              Вход на сайт
            </div>
          </div>
          <div className="modal__content">
            <div className="t-primary">Введите свои данные или зарегистрируйтесь, <br /> если вы здесь впервые.</div>
            <div className="modal-auth">
              <div className="modal-auth__left">
                <Formsy
                  className="login__form"
                  onSubmit={this.handleSubmit}
                  onValid={this.formValid}
                  onInvalid={this.formInvalid}
                  ref={this.formRef}
                >
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
                    <a href="#" className="t-link">Не помню пароль</a>
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  logIn: (credentials) => dispatch({ type: 'LOG_IN', payload: credentials }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
