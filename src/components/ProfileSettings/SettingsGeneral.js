import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import FormInput from '../Forms/Input';
import Checkbox from '../Forms/Checkbox';
import Toggle from '../Forms/Toggle';
import SvgIcon from '../Helpers/SvgIcon';
import Tooltip from '../Helpers/Tooltip';
import Logout from '../Signup/Logout';
import DeleteAccount from '../Signup/DeleteAccount';
import { openModal, closeModal } from '../../actions/modal'
import GetCalendarDays from '../../helpers/GetCalendarDays';
import { daySelect, monthSelect, yearSelect } from '../../helpers/CalendarSelectArrays';
import MapArrToSelect from '../../helpers/MapArrToSelect';

class Settings extends Component{
  constructor(props){
    super(props);

    this.state = {
      nickname: '',
      gender: null,
      birth_day: '',
      birth_month: '',
      birth_year: '',
      city: '',
      email: '',
      phone: '',
      password: '',
      new_password: '',
      new_password_repeat: '',
      recommendation: false,
      daySelect: daySelect,
      monthSelect: monthSelect,
      yearSelect: yearSelect
    }

    this.formRef = React.createRef();
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
      // this.signupUser();
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

  // checkbox functions
  toggleCheckbox = () => {
    this.setState({
      recommendation: !this.state.recommendation
    })
  }

  signupUser = () => {
    // auth
    const {
      nickname, birth_day, birth_month, birth_year, gender, city, email, password
    } = this.state;

    // const date = {
    //   day: birth_day ? birth_day.value : "",
    //   month: birth_month ? birth_month.value : "",
    //   year: birth_year ? birth_year.value : "",
    // }
    //
    // const leadObj = {
    //   nickname: nickname,
    //   birth_date: `${date.day} ${date.month} ${date.year}`,
    //   gender: gender,
    //   city: city ? city.value : "",
    //   email: email,
    //   password: password
    // }

  }

  render(){
    const {
      state: {
        nickname, gender,
        birth_day, birth_month, birth_year,
        city, email, phone, password, new_password, new_password_repeat,
        daySelect, monthSelect, yearSelect,
        recommendation
      }
    } = this

    return(
      <Formsy
        className="signup__form"
        onSubmit={this.handleSubmit}
        onValid={this.formValid}
        onInvalid={this.formInvalid}
        ref={this.formRef} >
        <FormInput
          sidePlugin="availableNickname"
          name="nickname"
          type="text"
          label="Никнейм:"
          placeholder="Например, Adelina491"
          extraClass="ui-group--row-with-plugin"
          value={nickname}
          validationErrors={{
            isDefaultRequiredValue: 'Заполните никнейм'
          }}
          onChangeHandler={this.handleChange}
          onKeyHandler={this.keyPressHandler}
          required />
        <div className="ui-group ui-group--row-with-plugin">
          <label htmlFor="">Пол</label>
          <Toggle
            value={gender}
            modifierClass="ui-toggle--big"
            options={{
              left: "Женский",
              right: "Мужской"
            }}
            clickHandler={this.selectToggle} />
          <div className="ui-group-plugin"></div>
        </div>
        <div className="ui-group ui-group--row-with-plugin">
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
          <div className="ui-group-plugin"></div>
        </div>
        <div className="ui-group ui-group--row-with-plugin">
          <label htmlFor="">Город</label>
          <Select
            name="city"
            searchable={true}
            noResultsText="Не найдено"
            autosize={false}
            value={city}
            onChange={(e) => this.handleSelectChange(e, "city")}
            placeholder="Укажите местоположение"
            options={MapArrToSelect(["Москва", "Санкт-Питербург"])} />
          <div className="ui-group-plugin"></div>
        </div>
        <FormInput
          name="email"
          label="Email:"
          placeholder="Введите e-mail"
          extraClass="ui-group--row-with-plugin"
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
          name="phone"
          label="Телефон:"
          placeholder="+7 (925) ***-**-16"
          extraClass="ui-group--row-with-plugin"
          value={phone}
          validationErrors={{
            isDefaultRequiredValue: 'Заполните телефон'
          }}
          onChangeHandler={this.handleChange}
          onKeyHandler={this.keyPressHandler}
          required />
        <FormInput
          name="password"
          type="password"
          label="Пароль:"
          placeholder=""
          extraClass="ui-group--row-with-plugin"
          value={password}
          validationErrors={{
            isDefaultRequiredValue: 'Заполните пароль'
          }}
          onChangeHandler={this.handleChange}
          onKeyHandler={this.keyPressHandler}
          required />

        <FormInput
          name="new_password"
          type="password"
          label="Повторите пароль:"
          placeholder=""
          extraClass="ui-group--row-with-plugin"
          value={new_password}
          validationErrors={{
            isDefaultRequiredValue: 'Заполните пароль'
          }}
          onChangeHandler={this.handleChange}
          onKeyHandler={this.keyPressHandler}
          required />
        <FormInput
          name="new_password_repeat"
          type="password"
          label="Повторите пароль:"
          placeholder=""
          extraClass="ui-group--row-with-plugin"
          value={new_password_repeat}
          validationErrors={{
            isDefaultRequiredValue: 'Заполните пароль'
          }}
          onChangeHandler={this.handleChange}
          onKeyHandler={this.keyPressHandler}
          required />

        <div className="ui-group ui-group--row-with-plugin">
          <label htmlFor="">Рекомендации похожих  аккаунтов:</label>
          <Checkbox
            name="recommendation"
            value={recommendation}
            clickHandler={this.toggleCheckbox}
            text={
              <React.Fragment>
                Рекомендовать Ваш аккаунт в числе тех, на которые люди, возможно захотят подписаться
                <Tooltip
                  content="Контент тултипа"
                  position="top" />
              </React.Fragment>
            } />
          <div className="ui-group-plugin"></div>
        </div>

        <div className="ui-group ui-group--row-with-plugin">
          <label htmlFor="">Действия с аккаунтом:</label>
          <button
            onClick={this.props.openModal.bind(this, 'logout')}
            className="btn btn-outline btn-outline--muted btn--iconed">
            <SvgIcon name="logout" />
            <span>Выйти из аккаунта</span>
          </button>
          <Logout />
          <button
            onClick={this.props.openModal.bind(this, 'delete-account')}
            className="btn btn-outline btn-outline--red btn--iconed">
            <SvgIcon name="close" />
            <span>Удалить аккаунт</span>
          </button>
          <DeleteAccount />
        </div>


        {/* <button className="btn btn-primary" type="submit">Зарегистрироваться</button> */}

      </Formsy>

    )
  }
}

Settings.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
