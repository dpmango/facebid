import React, {Component} from 'react';
import SvgIcon from '../../components/Helpers/SvgIcon';
import FilterSlider from './FilterSlider';
// import Select from '../Forms/Select';
import Select from 'react-select';
import Slider from 'rc-slider';
import Toggle from '../Forms/Toggle';

class Filters extends Component {
  constructor(){
    super()

    this.state = {
      gender: null,
      range: 20,
      age: null,
      languages: []
    }
  }

  createEventClick = () => {

  }

  clearFiltersClick = () => {

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

  render(){

    const {
      state: {
        gender, range, age, languages
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
            <input type="text" placeholder="Чем ты хочешь заняться?"/>
            <SvgIcon name="search" />
          </div>
          <div onClick={this.clearFiltersClick} className="filters__clear">
            <SvgIcon name="close" />
          </div>
        </div>
        <div className="filters__options">
          <div className="filters__options-col filters__options-col--gender">
            <div className="ui-group">
              <label htmlFor="">Показывать</label>
              <Select
                name="gender"
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
                simpleValue={true}
                searchable={false}
                autosize={false}
                value={languages}
                onChange={(e) => this.handleSelectChange(e, "languages")}
                placeholder="Выберите языки"
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
            <a href="#" className="t-link-small">Очистить</a>
          </div>
        </div>
        <div className="filters__categories">
          <FilterSlider />
        </div>
      </div>
    )
  }
}

export default Filters
