import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Slider from 'rc-slider';
import Select from 'react-select';

import CreateEvent from './Create';
import FilterSlider from './FilterSlider';
import SvgIcon from '../Helpers/SvgIcon';
import SimpleInput from '../Forms/SimpleInput';
import Toggle from '../Forms/Toggle';
import Plurize from '../../services/Plurize';

import { setFilterParams } from '../../actions/event-filter';
import { openModal, closeModal } from '../../actions/modal'

class Filters extends Component {
  constructor(props){
    super(props)

    this.initialState = props.eventFilterRedux
    // {
    //   eventName: props.eventFilterRedux.eventName,
    //   gender: props.eventFilterRedux.gender,
    //   range: props.eventFilterRedux.range,
    //   age: props.eventFilterRedux.age,
    //   languages: props.eventFilterRedux.languages,
    //   categories: props.eventFilterRedux.categories
    // }

    this.state = this.initialState

  }

  createEventClick = () => {
    this.props.openModal('create-event');
  }

  clearFiltersClick = () => {
    this.setState(this.initialState)
  }

  filtersToggle = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  }

  // input functions
  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  // slider functions
  rangeSliderChange = (val) => {
    this.setState({
      range: val
    })
  };

  rangeSliderAfterChange = (val) => {

  }

  selectToggle = (val) => {
    this.setState({
      age: val
    })
  }

  selectCategory = (id) => {
    const options = this.state.categories
    const index = options.indexOf(id)
    if ( index !== -1 ){
      options.splice(index, 1);
    } else {
      options.push(id)
    }

    this.setState({
      categories: options
    })
  }

  multipleValueTransform = (items) => {
    const totalHiddenItems = items.length;

    return (
      <div className="Select-value more-than-allowed">
        <span className="Select-value-label" role="option" aria-selected="true">
          {Plurize(totalHiddenItems, "Выбран", "Выбрано", "Выбрано")} {(totalHiddenItems)} {Plurize(totalHiddenItems, "язык", "языка", "языков")}
            <span className="Select-aria-only">&nbsp;</span>
        </span>
      </div>
    );

  }

  render(){

    const {
      state: {
        isOpened, gender, range, age, languages, categories, eventName
      }
    } = this

    return(
      <div className={"filters" + ( isOpened ? " is-active" : "" )}>
        <div className="filters__top">
          <button onClick={this.createEventClick} className="btn btn-primary btn--iconed">
            <SvgIcon name="plus" />
            <span>Создать событие</span>
          </button>
          <CreateEvent />
          <SimpleInput
            name="eventName"
            placeholder="Чем ты хочешь заняться?"
            icon="search"
            value={eventName}
            onChangeHandler={this.handleChange} />
          <div onClick={this.filtersToggle} className="filters__toggle">
            <SvgIcon name="filter" />
            <SvgIcon name="close" />
          </div>
        </div>
        <Collapse
          isOpened={isOpened}
          theme={{
            content: 'filters__options-collapse'
          }}
          className="filters__options">
          <div className="filters__options-col filters__options-col--gender">
            <div className="ui-group">
              <label htmlFor="">Показывать</label>
              <Select
                name="gender"
                clearable={false}
                searchable={false}
                autosize={false}
                value={gender}
                onChange={(e) => this.handleSelectChange(e, "gender")}
                placeholder="Выберите пол"
                options={[
                  { value: 'female', label: 'Девушек' },
                  { value: 'male', label: 'Парней' }
                ]}
              />
            </div>
          </div>
          <div className="filters__options-col filters__options-col--range">
            <div className="ui-group">
              <label htmlFor="">В радиусе</label>
              <div className="ui-slider">
                <div className="ui-slider__info">
                  <div className="ui-slider__val">{range === 100 ? "100+" : range}</div>
                  <div className="ui-slider__name">км</div>
                </div>
                <Slider
                  defaultValue={20}
                  value={range}
                  min={5}
                  step={5}
                  max={100}
                  onChange={this.rangeSliderChange}
                  onAfterChange={this.rangeSliderAfterChange}
                />
              </div>
            </div>
          </div>
          <div className="filters__options-col filters__options-col--age">
            <div className="ui-group">
              <label htmlFor="">Возраст</label>
              <Toggle
                value={age}
                options={{
                  left: "26",
                  right: "32"
                }}
                clickHandler={this.selectToggle} />
            </div>
          </div>
          <div className="filters__options-col filters__options-col--languages">
            <div className="ui-group">
              <label htmlFor="">Языки</label>
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
                valueComponent={this.multipleValueTransform.bind(this, languages)}
                options={[
                  { value: 'RUS', label: 'Русский' },
                  { value: 'ENG', label: 'Английский' },
                  { value: 'GER', label: 'Немецкий' },
                  { value: 'ESP', label: 'Испанский' },
                  { value: 'FRA', label: 'Французкий' }
                ]}
              />
            </div>
          </div>
          <div className="filters__options-col filters__options-col--clear">
            <a onClick={this.clearFiltersClick} className="t-link-small">Очистить</a>
          </div>
        </Collapse>
        <div className="filters__categories">
          <FilterSlider
            values={categories}
            clickHandler={this.selectCategory}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  eventFilterRedux: state.eventFilter
});

const mapDispatchToProps = (dispatch) => ({
  setFilterParams: (data) => dispatch(setFilterParams(data)),
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
