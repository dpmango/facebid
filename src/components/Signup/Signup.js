import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Modal from '../Modal/Modal';
import FormInput from '../Forms/Input';
import Toggle from '../Forms/Toggle';
import SocialLogin from './SocialLogin';
import { openModal, closeModal } from '../../actions/modal'

class Signup extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'signup',
      nickname: '',
      birth_day: '',
      birth_month: '',
      birth_year: '',
      gender: null,
      city: '',
      email: '',
      password: '',
      password_repeat: ''
    }

    this.formRef = React.createRef();
  }

  show = () => {
    this.props.openModal(
      this.state.modalName
    )
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

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  mapArrToSelect = (arr) => {
    // create react-select value/label pair from arr entiries
    return arr.map(el => {
      return { value: el, label: el }
    })
  }

  // toggle functions
  selectToggle = (val) => {
    this.setState({
      gender: val
    })
  }

  signupUser = () => {
    // auth
    alert('TODO - auth')
  }

  render(){
    const {
      state: {
        modalName,
        nickname,
        birth_day, birth_month, birth_year,
        gender, city, email, password, password_repeat
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
          <div className="modal__header">
            <div className="h4-title">
              Регистрация
            </div>
          </div>
          <div className="modal__content">
            <div className="t-primary">Начинте общение уже сейчас! Получите доступ  <br/>к 99 481 объявлениям в 2 клика!</div>
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
                  <div className="ui-group ui-group--row">
                    <label htmlFor="">Дата рождения</label>
                    <div className="ui-birth-selects">
                      <Select
                        name="birth_day"
                        clearable={false}
                        searchable={true}
                        autosize={false}
                        value={birth_day}
                        onChange={(e) => this.handleSelectChange(e, "birth_day")}
                        placeholder="день"
                        options={this.mapArrToSelect(
                          [
                            "01", "02", "03", "04", "05", "06", "07", "08", "09",
                            "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
                            "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
                            "30", "31"
                          ]
                        )
                        }
                      />
                      <Select
                        name="birth_month"
                        clearable={false}
                        searchable={false}
                        autosize={false}
                        value={birth_month}
                        onChange={(e) => this.handleSelectChange(e, "birth_month")}
                        placeholder="месяц"
                        options={[
                          {value: "01", label: "Января"},
                          {value: "02", label: "Ферваля"},
                          {value: "03", label: "Марта"},
                          {value: "04", label: "Апреля"},
                          {value: "05", label: "Мая"},
                          {value: "06", label: "Июня"},
                          {value: "07", label: "Июля"},
                          {value: "08", label: "Августа"},
                          {value: "09", label: "Сентября"},
                          {value: "10", label: "Октября"},
                          {value: "11", label: "Ноября"},
                          {value: "12", label: "Декабря"}
                        ]}
                      />
                      <Select
                        name="birth_year"
                        clearable={false}
                        searchable={false}
                        autosize={false}
                        value={birth_year}
                        onChange={(e) => this.handleSelectChange(e, "birth_year")}
                        placeholder="год"
                        options={this.mapArrToSelect(
                          [
                            "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001",
                            "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991",
                            "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981"
                          ]
                        )
                        }
                      />
                    </div>
                  </div>
                  <div className="ui-group ui-group--row">
                    <label htmlFor="">Пол</label>
                    <Toggle
                      value={gender}
                      modifierClass="ui-toggle--big"
                      options={{
                        left: "Женский",
                        right: "Мужской"
                      }}
                      clickHandler={this.selectToggle} />
                  </div>
                  <div className="ui-group ui-group--row">
                    <label htmlFor="">Город</label>
                    <Select
                      name="city"
                      searchable={false}
                      autosize={false}
                      value={city}
                      onChange={(e) => this.handleSelectChange(e, "city")}
                      placeholder="Укажите местоположение"
                      options={this.mapArrToSelect(
                        [
                          "Москва", "Санкт-Питербург"
                        ]
                      )
                      }
                    />
                  </div>
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

Signup.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
