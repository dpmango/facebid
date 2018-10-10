import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Select from 'react-select';
import FormInput from 'components/Forms/Input';
import Toggle from 'components/Forms/Toggle';
import { setCreateEvent } from 'actions/create-event';
import { daySelect, monthSelect, yearSelect } from 'helpers/CalendarSelectArrays';
import MapArrToSelect from 'helpers/MapArrToSelect';
import CategoriesSlider from '../CategoriesSlider';

class CreateStep1 extends Component {
  constructor(props){
    super(props);

    this.state = {
      categories: props.createEventRedux.categories,
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
    }

    this.maxCategories = 3
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

  // slider category functions
  selectCategory = (id) => {
    let options = this.state.categories
    const index = options.indexOf(id)
    if ( index !== -1 ){
      options.splice(index, 1);
    } else {
      // max is 3
      if ( options.length === this.maxCategories ){

      } else {
        options.push(id)
      }
    }

    this.setState({
      categories: options
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
      categories: this.state.categories,
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
        categories, departure, destination,
        event_day, event_month, event_year,
        daySelect, monthSelect, yearSelect,
        eventType, numberOfPeople,
        title, description,
        privacyComments, privacyDisplayMembers
      },
      props: {

      }
    } = this
    return(
      <Formsy
        className="create-e"
        onSubmit={this.handleSubmit}
        onValid={this.formValid}
        onInvalid={this.formInvalid}
        ref={this.formRef} >

        <div className="create-e__section">
          <div className="create-e__section-name">
            <div className="h4-title">Выберите категорию события</div>
            <div
              className={"create-e__categories-counter" + (categories.length === 3 ? " is-maxed-out" : "")}>Выбраны категории <span>{categories.length}/3</span></div>
          </div>
          <div className="create-e__categories">
            <CategoriesSlider
              type="create-event"
              values={categories}
              clickHandler={this.selectCategory}/>
          </div>
        </div>

        <div className="create-e__section">
          <div className="create-e__section-name h4-title">Настройки события</div>

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


      </Formsy>
    )
  }

}


CreateStep1.propTypes = {
  setCreateEvent: PropTypes.func
}

const mapStateToProps = (state) => ({
  createEventRedux: state.createEvent
});

const mapDispatchToProps = (dispatch) => ({
  setCreateEvent: (data) => dispatch(setCreateEvent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStep1);
