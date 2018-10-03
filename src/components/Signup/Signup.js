import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Modal from '../Modal/Modal';
import FormInput from '../Forms/Input';
import Toggle from '../Forms/Toggle';
import SocialLogin from './SocialLogin';
import { openModal, closeModal } from 'actions/modal'
import { signupRequest } from 'actions/user';
import GetCalendarDays from 'helpers/GetCalendarDays';
import { daySelect, monthSelect, yearSelect } from 'helpers/CalendarSelectArrays';
import MapArrToSelect from 'helpers/MapArrToSelect';

class Signup extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'signup',
      username: '',
      birth_day: '',
      birth_month: '',
      birth_year: '',
      gender: null,
      city: '',
      email: '',
      password: '',
      password_repeat: '',
      daySelect: daySelect,
      monthSelect: monthSelect,
      yearSelect: yearSelect,
      birth_error: null,
      gender_error: null,
      city_error: null
    }

    this.formRef = React.createRef()
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

  // custom fields validation
  validateBirth = () => {
    const {birth_day, birth_month, birth_year} = this.state;

    if ( birth_day && birth_month && birth_year ){
      return true
    } else {
      return false
    }
  }

  validateGender = () => {
    if ( this.state.gender ){
      return true
    } else {
      return false
    }
  }

  validateCity = () => {
    if ( this.state.city ){
      return true
    } else {
      return false
    }
  }

  // submit handler from the form
  handleSubmit = (e) => {
    this.setState({isFormSubmitted: true})
    if ( this.state.formIsValid &&
      this.validateBirth() && this.validateGender() && this.validateCity() ){
      this.signupUser();
      this.setState({isFormSubmitted: false}) // reset state here
    }
  }

  // click handler for the button
  submitForm = () => {
    // attach error handlers
    if ( !this.validateBirth() ){
      this.setState({birth_error: "Заполните дату рождения"})
    } else {
      this.setState({birth_error: null})
    }

    if ( !this.validateGender() ){
      this.setState({gender_error: "Выберите пол"})
    } else {
      this.setState({gender_error: null})
    }

    if ( !this.validateCity() ){
      this.setState({city_error: "Выберите город"})
    } else {
      this.setState({city_error: null})
    }

    // this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      // this.submitForm();
      this.formRef.current.submit();
    }
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value },
      () => {
        if ( name === "birth_month" || name === "birth_year" ){
          this.updateDatesOnSelect();
        }
    })
  }

  updateDatesOnSelect = () => {
    const { birth_day, birth_month, birth_year } = this.state;

    // should update availbe days on select
    // as the monthes and years are always the same
    if ( birth_month && birth_year ){
      const availableDays = GetCalendarDays(parseInt(birth_year.value, 10), parseInt(birth_month.value, 10))
      let resultObj = {
        ...this.state,
        daySelect: availableDays
      }

      // update the day if seleted past!
      if ( birth_day ){
        const lastAvailableDay = availableDays.slice(-1)[0];
        const currentSelectedDay = parseInt(birth_day.value, 10)
        let makeDay

        if ( lastAvailableDay < currentSelectedDay ){
          makeDay = lastAvailableDay < 10 ? `0${lastAvailableDay}` : lastAvailableDay

          resultObj = {
            ...this.state,
            daySelect: availableDays,
            birth_day: {
              value: makeDay, label: makeDay
            }
          }
        }

      }

      this.setState(resultObj)
    }
  }

  // toggle functions
  selectToggle = (val) => {
    this.setState({
      gender: val
    })
  }

  signupUser = () => {
    // auth
    const {
      username, birth_day, birth_month, birth_year, gender, city, email, password
    } = this.state;

    const date = {
      day: birth_day ? birth_day.value : "",
      month: birth_month ? birth_month.value : "",
      year: birth_year ? birth_year.value : "",
    }

    const leadObj = {
      username: username,
      birth_date: `${date.day} ${date.month} ${date.year}`,
      gender: gender,
      city: city ? city.value : "",
      email: email,
      password: password
    }

    this.props.signupRequest(leadObj)
  }

  render(){
    const {
      state: {
        modalName,
        username,
        birth_day, birth_month, birth_year,
        gender, city, email, password, password_repeat,
        daySelect, monthSelect, yearSelect,
        birth_error, gender_error, city_error
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
                  onSubmit={this.submitForm}
                  onValidSubmit={this.handleSubmit}
                  onValid={this.formValid}
                  onInvalid={this.formInvalid}
                  ref={this.formRef}
                >
                  <FormInput
                    name="username"
                    type="text"
                    label="Никнейм:"
                    placeholder="Например, Adelina491"
                    extraClass="ui-group--row"
                    value={username}
                    validationErrors={{
                      isDefaultRequiredValue: 'Заполните никнейм'
                    }}
                    onChangeHandler={this.handleChange}
                    onKeyHandler={this.keyPressHandler}
                    required />
                  <div className="ui-group ui-group--row">
                    <label htmlFor="">Дата рождения</label>
                    <div className="ui-date-selects">
                      <Select
                        name="birth_day"
                        clearable={false}
                        searchable={true}
                        noResultsText="Не найдено"
                        autosize={false}
                        value={birth_day}
                        onChange={(e) => this.handleSelectChange(e, "birth_day")}
                        placeholder="день"
                        options={MapArrToSelect(daySelect)} />
                      <Select
                        name="birth_month"
                        clearable={false}
                        searchable={false}
                        autosize={false}
                        value={birth_month}
                        onChange={(e) => this.handleSelectChange(e, "birth_month")}
                        placeholder="месяц"
                        options={monthSelect} />
                      <Select
                        name="birth_year"
                        clearable={false}
                        searchable={true}
                        noResultsText="Не найдено"
                        autosize={false}
                        value={birth_year}
                        onChange={(e) => this.handleSelectChange(e, "birth_year")}
                        placeholder="год"
                        options={MapArrToSelect(yearSelect)}/>
                    </div>
                    { birth_error &&
                      <span className="ui-validation">{birth_error}</span>
                    }
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
                    { gender_error &&
                      <span className="ui-validation">{gender_error}</span>
                    }
                  </div>
                  <div className="ui-group ui-group--row">
                    <label htmlFor="">Город</label>
                    <Select
                      name="city"
                      searchable={true}
                      noResultsText="Не найдено"
                      autosize={false}
                      value={city}
                      onChange={(e) => this.handleSelectChange(e, "city")}
                      placeholder="Укажите местоположение"
                      options={MapArrToSelect(
                        ["Москва", "Санкт-Питербург"])}
                      />
                    { city_error &&
                      <span className="ui-validation">{city_error}</span>
                    }
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
  closeModal: PropTypes.func,
  signupRequest: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal()),
  signupRequest: (data) => dispatch(signupRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
