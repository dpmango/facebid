import React, {Component} from 'react';
import SvgIcon from '../Helpers/SvgIcon';
import FilterSlider from './FilterSlider';
import Plurize from '../../services/Plurize';
// import Select from '../Forms/Select';
import Select from 'react-select';
import Slider from 'rc-slider';
import Toggle from '../Forms/Toggle';

class Filters extends Component {
  constructor(){
    super()

    this.initialState = {
      eventName: '',
      gender: null,
      range: 20,
      age: null,
      languages: [],
      categories: [1]
    }

    this.state = this.initialState

  }

  createEventClick = () => {

  }

  clearFiltersClick = () => {
    this.setState(this.initialState)
  }

  closeFiltersClick = () => {

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
        gender, range, age, languages, categories, eventName
      }
    } = this

    return(
      <div className="filters">
        <div className="filters__top">
          <button onClick={this.createEventClick} className="btn btn-primary btn--iconed">
            <SvgIcon name="plus" />
            <span>Создать событие</span>
          </button>
          <div className="ui-input ui-input--iconed">
            <input
              name="eventName"
              onChange={this.handleChange}
              value={eventName}
              type="text"
              placeholder="Чем ты хочешь заняться?"
            />
            <SvgIcon name="search" />
          </div>
          <div onClick={this.closeFiltersClick} className="filters__clear">
            <SvgIcon name="close" />
          </div>
        </div>
        <div className="filters__options">
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
        </div>
        <div className="filters__categories">
          <FilterSlider
            values={categories}
            clickHandler={this.selectCategory}/>
        </div>
      </div>
    )
  }
}

export default Filters
