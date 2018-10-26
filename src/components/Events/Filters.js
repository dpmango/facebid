import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import FiltersCore from './FiltersCore';
import CategoriesSlider from './CategoriesSlider';
import FiltersExtra from './FiltersExtra';
import SvgIcon from '../Helpers/SvgIcon';
import SimpleInput from '../Forms/SimpleInput';
// import Toggle from '../Forms/Toggle';
import { setFilterParams } from 'actions/event-filter';
import { openModal } from 'actions/modal'

class Filters extends Component {
  constructor(props){
    super(props)

    this.initialState = {
      ...props.eventFilterRedux
    }
    // {
    //   isOpened: props.eventFilterRedux.isOpened,
    //   eventName: props.eventFilterRedux.eventName,
    //   gender: props.eventFilterRedux.gender,
    //   range: props.eventFilterRedux.range,
    //   age: props.eventFilterRedux.age,
    //   city: props.eventFilterRedux.city,
    //   languages: props.eventFilterRedux.languages,
    //   categories: props.eventFilterRedux.categories,
    //   isExtraOpened: props.eventFilterRedux.isExtraOpened
    //   + bunch of extra options
    // }

    this.state = this.initialState
  }

  filtersToggle = () => {
    this.setState({
      isCoreOpened: !this.state.isCoreOpened
    })
  }

  // input functions
  handleInputChange = (e) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fieldVal});
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  // slider functions
  rangeSliderChange = (name) => (val) => {
    this.setState({
      [name]: val
    })
  };

  // radio functions
  radioChange = (val, name) => {
    this.setState({
      [name]: val
    })
  }

  // checkbox functions
  handleCheckboxToggle = (name) => {
    this.setState({[name]: !this.state[name]})
  }

  // triggered when category is selected
  selectCategory = (id) => {
    let options = this.state.categories
    const index = options.indexOf(id)
    if ( index !== -1 ){
      options.splice(index, 1);
    } else {
      options.push(id)
    }

    if ( options.length > 1) {
      // remove first option (all) if something else selected
      if (options.indexOf(1) !== -1){
        options = options.filter(x => x !== 1)
      }
      // allow selecting all (id = 1)
      if ( id === 1 ){
        options = [1]
      }
    // reserve first category (all) as default
    } else if ( options.length === 0 ){
      options = [1]
    }

    // show/hide extra filters
    const anyExtraAvailable = (options.length === 1) &&
                              (options[0] === 3 || options[0] === 7) // travel or lang

    this.setState({
      categories: options,
      isExtraOpened: anyExtraAvailable
    })

  }

  // cta actions
  searchFilters = () => {

  }

  clearFiltersClick = () => {
    this.setState({
      ...this.initialState,
      isCoreOpened: true // keep it opened
    })
  }

  clearExtraFiltersClick = () => {
    this.setState({
      ...this.state,
      isExtraOpened: true, // keep it opened
      departure: this.initialState.departure,
      destination: this.initialState.destination,
      alreadyTravelling: this.initialState.alreadyTravelling,
      lang_language: this.initialState.lang_language,
      lang_level: this.initialState.lang_level
    })
  }

  render(){

    const {
      state: {
        isCoreOpened, gender, range, age, city, languages, categories, eventName,
        isExtraOpened, departure, destination, alreadyTravelling, lang_language, lang_level
      },
      props: {
        openModal
      }
    } = this

    return(
      <div className={"filters" + ( isCoreOpened ? " is-active" : "" )}>
        <div className="filters__top">
          <button onClick={openModal.bind(this, 'create-event')} className="btn btn-primary btn--iconed">
            <SvgIcon name="plus" />
            <span>Создать событие</span>
          </button>
          <SimpleInput
            name="eventName"
            placeholder="Чем ты хочешь заняться?"
            icon="search"
            value={eventName}
            onChangeHandler={this.handleInputChange} />
          <div onClick={this.filtersToggle} className="filters__toggle btn btn-circle">
            <SvgIcon name="filter" />
            <SvgIcon name="close" />
          </div>
        </div>
        <Collapse
          isOpened={isCoreOpened}>
          <FiltersCore
            gender={gender}
            age={age}
            city={city}
            range={range}
            languages={languages}
            onInputChange={this.handleInputChange}
            onSelectChange={this.handleSelectChange}
            onRangeChange={this.rangeSliderChange}
            onRadioChange={this.radioChange}
            onFiltersSearchClick={this.searchFilters}
            onClearFiltersClick={this.clearFiltersClick} />
        </Collapse>
        <div className="filters__categories">
          <CategoriesSlider
            values={categories}
            clickHandler={this.selectCategory}/>
        </div>
        <div className="filters__extra">
          <Collapse
            isOpened={isExtraOpened}>
            <FiltersExtra
              categories={categories}
              departure={departure}
              destination={destination}
              alreadyTravelling={alreadyTravelling}
              lang_language={lang_language}
              lang_level={lang_level}
              onInputChange={this.handleInputChange}
              onSelectChange={this.handleSelectChange}
              onCheckboxChange={this.handleCheckboxToggle}
              onClearExtraFiltersClick={this.clearExtraFiltersClick} />
          </Collapse>
        </div>
      </div>
    )
  }
}

Filters.propTypes = {
  eventFilterRedux: PropTypes.object,
  setFilterParams: PropTypes.func,
  openModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  eventFilterRedux: state.eventFilter
});

const mapDispatchToProps = (dispatch) => ({
  setFilterParams: (data) => dispatch(setFilterParams(data)),
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
