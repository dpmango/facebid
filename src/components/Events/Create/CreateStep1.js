import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Select from 'react-select';
import { Collapse } from 'react-collapse';
import Tooltip from 'components/Helpers/Tooltip';
import FormInput from 'components/Forms/Input';
import Tumbler from 'components/Forms/Tumbler';
import CategoriesSlider from '../CategoriesSlider';
import { setCreateEvent } from 'actions/create-event';
import { daySelect, monthSelect, yearSelect } from 'helpers/CalendarSelectArrays';
import MapArrToSelect from 'helpers/MapArrToSelect';
import SelectLanguageOption from 'helpers/SelectLanguageOption';
import MultipleSelectToTotal from 'helpers/MultipleSelectToTotal';
import LanguageOptions from 'helpers/LanguageOptions';
import CityOptions from 'helpers/CityOptions';

class CreateStep1 extends Component {
  constructor(props){
    super(props);

    this.state = {
      categories: props.createEventRedux.categories,
      departure: props.createEventRedux.departure,
      destination: props.createEventRedux.destination,
      languages: props.createEventRedux.languages,
      city: props.createEventRedux.city,
      event_day: props.createEventRedux.event_day,
      event_month: props.createEventRedux.event_month,
      event_year: props.createEventRedux.event_year,
      daySelect: daySelect,
      monthSelect: monthSelect,
      yearSelect: yearSelect,
      isGroupEvent: props.createEventRedux.isGroupEvent,
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
    let fieldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fieldVal});
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
  selectToggle = (name) => {
    this.setState({
      [name]: !this.state[name]
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
      languages: this.state.languages,
      city: this.state.city,
      event_day: this.state.event_day,
      event_month: this.state.event_month,
      event_year: this.state.event_year,
      isGroupEvent: this.state.isGroupEvent,
    })
  }

  render(){
    const {
      state: {
        categories, departure, destination, languages, city,
        event_day, event_month, event_year,
        daySelect, monthSelect, yearSelect,
        isGroupEvent
      },
      props: {

      }
    } = this

    const isTravelEvent = isEqual(categories, [3])
    const isLangEvent = isEqual(categories, [7])

    return(
      <Formsy
        className="create-e"
        onSubmit={this.handleSubmit}
        onValid={this.formValid}
        onInvalid={this.formInvalid}
        ref={this.formRef} >

        {/* Categories selector */}
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

        <Collapse
          isOpened={categories.length > 0}>

          <div className="create-e__section">
            <div className="create-e__section-name h4-title">Настройки события</div>

            { isTravelEvent &&
              <div className="ui-group ui-group--row-with-plugin">
                <label htmlFor="">Пункт назначения:</label>
                <div className="ui-destination-selects">
                  <Select
                    name="departure"
                    multi={false}
                    removeSelected={false}
                    clearable={false}
                    searchable={true}
                    noResultsText="Не найдено"
                    autosize={false}
                    value={departure}
                    onChange={(e) => this.handleSelectChange(e, "departure")}
                    placeholder="Откуда"
                    options={MapArrToSelect(CityOptions)}/>
                  <Select
                    name="destination"
                    multi={false}
                    removeSelected={false}
                    clearable={false}
                    searchable={true}
                    noResultsText="Не найдено"
                    autosize={false}
                    value={destination}
                    onChange={(e) => this.handleSelectChange(e, "destination")}
                    placeholder="Куда"
                    options={MapArrToSelect(CityOptions)}/>
                </div>
                <div className="ui-group-plugin"></div>
              </div>
            }

            { isLangEvent &&
              <div className="ui-group ui-group--row-with-plugin">
                <label htmlFor="">Выберите язык:</label>
                <Select
                  name="languages"
                  multi={true}
                  removeSelected={false}
                  simpleValue={false}
                  clearable={false}
                  searchable={false}
                  autosize={false}
                  value={languages}
                  onChange={(e) => this.handleSelectChange(e, "languages")}
                  placeholder="Выберите языки"
                  optionRenderer={SelectLanguageOption}
                  valueComponent={MultipleSelectToTotal.bind(this, languages)}
                  options={LanguageOptions}/>
                <div className="ui-group-plugin"></div>
              </div>
            }

            { (!isLangEvent && !isTravelEvent) &&
              <div className="ui-group ui-group--row-with-plugin">
                <label htmlFor="">Выберите город:</label>
                <Select
                  name="city"
                  multi={false}
                  removeSelected={false}
                  clearable={false}
                  searchable={true}
                  noResultsText="Не найдено"
                  autosize={false}
                  value={city}
                  onChange={(e) => this.handleSelectChange(e, "city")}
                  placeholder="Выберите город"
                  options={MapArrToSelect(CityOptions)}/>
                <div className="ui-group-plugin"></div>
              </div>
            }

            <div className="ui-group ui-group--row-with-plugin">
              <label htmlFor="">Дата события:</label>
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
              <div className="ui-group-plugin"></div>
            </div>

            <div className="ui-group ui-group--row-with-plugin">
              <label htmlFor="">
                Тип события:
                <Tooltip
                  content="Контент" />
              </label>
              <Tumbler
                preText="Групповое"
                value={isGroupEvent}
                clickHandler={this.selectToggle.bind(this, "isGroupEvent")} />
              <div className="ui-group-plugin"></div>
            </div>
          </div>
        </Collapse>


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
