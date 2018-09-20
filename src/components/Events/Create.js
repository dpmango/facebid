import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Modal from '../Modal/Modal';
import FormInput from '../Forms/Input';
import Toggle from '../Forms/Toggle';
import CreateMiniUploader from './CreateMiniUploader';
import { openModal, closeModal } from 'actions/modal';
import { setCreateEvent } from 'actions/create-event';
import { daySelect, monthSelect, yearSelect } from 'helpers/CalendarSelectArrays';
import MapArrToSelect from 'helpers/MapArrToSelect';

class Create extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'create-event',
      category: props.createEventRedux.category,
      departure: props.createEventRedux.departure,
      destination: props.createEventRedux.destination,
      event_day: props.createEventRedux.event_day,
      event_month: props.createEventRedux.event_month,
      event_year: props.createEventRedux.event_year,
      daySelect: daySelect,
      monthSelect: monthSelect,
      yearSelect: yearSelect,
      eventType: props.createEventRedux.eventType,
      numberOfPeople: props.createEventRedux.numberOfPeople,

      title: props.createEventRedux.title,
      description: props.createEventRedux.description,

      privacyComments: props.createEventRedux.privacyComments,
      privacyDisplayMembers: props.createEventRedux.privacyDisplayMembers
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
      this.processNext();
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
        // if ( name === "event_month" || name === "event_year" ){
        //   this.updateDatesOnSelect();
        // }
    })
  }

  // toggle functions
  selectToggle = (val, name) => {
    this.setState({
      [name]: val
    })
  }


  // auth passed to redux
  processNext = () => {
    this.saveState();
    // this.props.openModal('create-event-2')
  }

  saveState = () => {
    this.props.setCreateEvent({
      ...this.props.createEventRedux,
      category: this.state.category,
      departure: this.state.departure,
      destination: this.state.destination,
      event_day: this.state.event_day,
      event_month: this.state.event_month,
      event_year: this.state.event_year,
      eventType: this.state.eventType,
      numberOfPeople: this.state.numberOfPeople,

      title: this.state.title,
      description: this.state.description,

      privacyComments: this.state.privacyComments,
      privacyDisplayMembers: this.state.privacyDisplayMembers
    })
  }

  render(){
    const {
      state: {
        modalName,
        category, departure, destination,
        event_day, event_month, event_year,
        daySelect, monthSelect, yearSelect,
        eventType, numberOfPeople,
        title, description,
        privacyComments, privacyDisplayMembers
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}>
        <div className="modal__header">
          <div className="h4-title">
            Создание события
          </div>
        </div>

        <Formsy
          className="create-e"
          onSubmit={this.handleSubmit}
          onValid={this.formValid}
          onInvalid={this.formInvalid}
          ref={this.formRef} >
          <div className="create-e__section">
            <div className="create-e__section-name h4-title">Настройки события</div>

            <div className="ui-group ui-group--row">
              <label htmlFor="">Город</label>
              <Select
                name="category"
                searchable={true}
                noResultsText="Не найдено"
                autosize={false}
                value={category}
                onChange={(e) => this.handleSelectChange(e, "category")}
                placeholder="Выберите категорию"
                options={MapArrToSelect(
                  [
                    "Волонтерство",
                    "Путешествия",
                    "В кино",
                    "Свидание",
                    "Фитнес",
                    "Языковой обмен",
                    "Культура",
                    "Хобби",
                    "Развлечения",
                    "Перекусим",
                    "Дети",
                    "Ночная жизнь",
                    "Образование",
                    "Активный отдых",
                    "Каучсерфинг"
                  ]
                )
                }
              />
            </div>

            <div className="ui-group ui-group--row">
              <label htmlFor="">Откуда:</label>
              <Select
                name="departure"
                multi={true}
                removeSelected={false}
                clearable={false}
                searchable={true}
                noResultsText="Не найдено"
                autosize={false}
                value={departure}
                onChange={(e) => this.handleSelectChange(e, "departure")}
                placeholder="Укажите город вылета"
                options={MapArrToSelect(
                  [
                    "Страна 1", "Страна 2"
                  ]
                )
                }
              />
            </div>
            <div className="ui-group ui-group--row">
              <label htmlFor="">Куда:</label>
              <Select
                name="destination"
                multi={true}
                removeSelected={false}
                clearable={false}
                searchable={true}
                noResultsText="Не найдено"
                autosize={false}
                value={destination}
                onChange={(e) => this.handleSelectChange(e, "destination")}
                placeholder="Укажите город прилета"
                options={MapArrToSelect(
                  [
                    "Страна 1", "Страна 2"
                  ]
                )
                }
              />
            </div>

            <div className="ui-group ui-group--row">
              <label htmlFor="">Вылета:</label>
              <div className="ui-date-selects">
                <Select
                  name="event_day"
                  clearable={false}
                  searchable={true}
                  noResultsText="Не найдено"
                  autosize={false}
                  value={event_day}
                  onChange={(e) => this.handleSelectChange(e, "event_day")}
                  placeholder="день"
                  options={MapArrToSelect(daySelect)} />
                <Select
                  name="event_month"
                  clearable={false}
                  searchable={false}
                  autosize={false}
                  value={event_month}
                  onChange={(e) => this.handleSelectChange(e, "event_month")}
                  placeholder="месяц"
                  options={monthSelect} />
                <Select
                  name="event_year"
                  clearable={false}
                  searchable={true}
                  noResultsText="Не найдено"
                  autosize={false}
                  value={event_year}
                  onChange={(e) => this.handleSelectChange(e, "event_year")}
                  placeholder="год"
                  options={MapArrToSelect(yearSelect)}/>
              </div>
            </div>

            <div className="ui-group ui-group--row">
              <label htmlFor="">Тип события:</label>
              <Toggle
                value={eventType}
                name="eventType"
                modifierClass="ui-toggle--big"
                options={{
                  left: "Групповое",
                  right: "Персональное"
                }}
                clickHandler={this.selectToggle} />
            </div>

            <div className="ui-group ui-group--row">
              <label htmlFor="">Количество участников:</label>
              <Select
                name="numberOfPeople"
                searchable={true}
                noResultsText="Не найдено"
                autosize={false}
                value={numberOfPeople}
                onChange={(e) => this.handleSelectChange(e, "numberOfPeople")}
                placeholder="Выберите участников"
                options={MapArrToSelect(
                  [
                    "Неважно",
                    "1-2",
                    "2-5",
                    "5-10",
                    "10-20",
                    "20+"
                  ]
                )
                }
              />
            </div>

          </div>

          {/* NEXT SECTION */}
          <div className="create-e__section">
            <div className="create-e__section-name h4-title">Основная информация</div>
            <FormInput
              name="title"
              label="Заголовок:"
              placeholder="Кто со мной в путешествие"
              extraClass="ui-group--row"
              value={title}
              validationErrors={{
                isDefaultRequiredValue: 'Заполните это поле'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required />
            <FormInput
              name="description"
              type="textarea"
              rows={[5, 10]}
              label="Описание:"
              placeholder="В июне состоится масштабное мероприятие одного из самых известных российских современных художников. Собираю группу из 20 человек. Сначала на выставку, потом гулять до утра."
              extraClass="ui-group--row"
              value={description}
              validationErrors={{
                isDefaultRequiredValue: 'Заполните это поле'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required />
            <div className="ui-group ui-group--row">
              <label></label>
              <CreateMiniUploader />
            </div>
          </div>

          {/* NEXT SECTION - PRIVACY */}
          <div className="create-e__section">
            <div className="create-e__section-name h4-title">Приватность</div>

            <div className="ui-group ui-group--row">
              <label htmlFor="">Комментарии:</label>
              <Toggle
                value={privacyComments}
                name="privacyComments"
                modifierClass="ui-toggle--big"
                options={{
                  left: "Включены",
                  right: "Выключены"
                }}
                clickHandler={this.selectToggle} />
            </div>
            <div className="ui-group ui-group--row">
              <label htmlFor="">Тип события:</label>
              <Toggle
                value={privacyDisplayMembers}
                name="privacyDisplayMembers"
                modifierClass="ui-toggle--big"
                options={{
                  left: "Отображать",
                  right: "Скрыть"
                }}
                clickHandler={this.selectToggle} />
            </div>

          </div>

          {/* NEXT SECTION - PREMIUM */}
          <div className="create-e__section">
            <div className="create-e__section-name h4-title">Премиум функции</div>
            <div className="ui-group ui-group--row">
              <label htmlFor="">Текущий баланс</label>
            </div>
          </div>

          <div className="create-e__cta">
            <button className="btn btn-primary" type="submit">Подтвердить</button>
          </div>
        </Formsy>
      </Modal>
    )
  }
}

Create.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  setCreateEvent: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal,
  createEventRedux: state.createEvent
});

const mapDispatchToProps = (dispatch) => ({
  setCreateEvent: (data) => dispatch(setCreateEvent(data)),
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
