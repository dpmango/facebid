import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import FiltersCore from './FiltersCore';
import CategoriesSlider from './CategoriesSlider';
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
    //   eventName: props.eventFilterRedux.eventName,
    //   gender: props.eventFilterRedux.gender,
    //   range: props.eventFilterRedux.range,
    //   age: props.eventFilterRedux.age,
    //   city: props.eventFilterRedux.city,
    //   languages: props.eventFilterRedux.languages,
    //   categories: props.eventFilterRedux.categories
    // }

    this.state = this.initialState
  }

  filtersToggle = () => {
    this.setState({
      isOpened: !this.state.isOpened
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

  selectCategory = (id) => {
    let options = this.state.categories
    const index = options.indexOf(id)
    if ( index !== -1 ){
      options.splice(index, 1);
    } else {
      options.push(id)
    }

    // reserve first category (all) as default
    if ( options.length === 0 ){
      options = [1]
    }

    this.setState({
      categories: options
    })
  }

  // cta actions
  searchFilters = () => {

  }

  clearFiltersClick = () => {
    this.setState({
      ...this.initialState,
      isOpened: true // kep it opened
    })
  }

  render(){

    const {
      state: {
        isOpened, gender, range, age, city, languages, categories, eventName
      },
      props: {
        openModal
      }
    } = this

    return(
      <div className={"filters" + ( isOpened ? " is-active" : "" )}>
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
          isOpened={isOpened}>
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
