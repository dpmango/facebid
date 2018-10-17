import React, {Component} from 'react';
import Slider, {Range} from 'rc-slider';
import Select from 'react-select';
import Radio from 'components/Forms/Radio';
import SimpleInput from '../Forms/SimpleInput';
import MultipleSelectToTotal from 'helpers/MultipleSelectToTotal';
import SelectLanguageOption from 'helpers/SelectLanguageOption';
import LanguageOptions from 'helpers/LanguageOptions';

class FiltersCore extends Component{
  render(){
    const {
      gender, range, age, languages, city
    } = this.props

    return(
      <div className="filters__options-collapse">
        <div className="filters__options-col">
          <div className="ui-group">
            <label htmlFor="">Показывать</label>
            {/* <Select
              name="gender"
              clearable={false}
              searchable={false}
              autosize={false}
              value={gender}
              onChange={(e) => this.props.onSelectChange(e, "gender")}
              placeholder="Выберите пол"
              options={[
                { value: 'all', label: 'Всех' },
                { value: 'female', label: 'Девушек' },
                { value: 'male', label: 'Парней' }
              ]} /> */}
              <div className="ui-radio-group">
                <Radio
                  name="gender"
                  value={gender}
                  text="Мужчин"
                  clickHandler={this.props.onRadioChange} />
                <Radio
                  name="gender"
                  value={gender}
                  text="Девушек"
                  clickHandler={this.props.onRadioChange} />
                <Radio
                  name="gender"
                  value={gender}
                  text="Всех"
                  clickHandler={this.props.onRadioChange} />
              </div>
          </div>
          <div className="ui-group">
            <div className="ui-slider">
              <div className="ui-slider__info">
                <div className="ui-slider__info-label">Возраст</div>
                <div className="ui-slider__val ui-slider__val--center">{age[0]} - {age[1] === 50 ? "50+" : age[1]}</div>
              </div>
              <Range
                defaultValue={[24, 32]}
                value={age}
                min={18}
                step={1}
                max={50}
                pushable={true}
                onChange={this.props.onRangeChange('age')} />
            </div>
          </div>
        </div>
        <div className="filters__options-col">
          <div className="ui-group">
            <label htmlFor="">Город:</label>
            <SimpleInput
              name="city"
              placeholder="Город"
              icon="search"
              value={city}
              onChangeHandler={this.props.onInputChange} />
          </div>

          <div className="ui-group">
            <div className="ui-slider">
              <div className="ui-slider__info">
                <div className="ui-slider__info-label">В радиусе</div>
                <div className="ui-slider__val ui-slider__val--center">{range === 100 ? "100+" : range} <span>км</span></div>
              </div>
              <Slider
                defaultValue={20}
                value={range}
                min={5}
                step={5}
                max={100}
                onChange={this.props.onRangeChange('range')} />
            </div>
          </div>
        </div>
        <div className="filters__options-col">
          <div className="ui-group">
            <label htmlFor="">Языки</label>
            <Select
              className="Select--country"
              name="languages"
              multi={true}
              removeSelected={false}
              simpleValue={false}
              clearable={false}
              searchable={false}
              closeOnSelect={false}
              autosize={false}
              value={languages}
              onChange={(e) => this.props.onSelectChange(e, "languages")}
              placeholder="Выберите языки"
              optionRenderer={SelectLanguageOption}
              valueComponent={MultipleSelectToTotal.bind(this, languages)}
              options={LanguageOptions}
            />
          </div>
          <div className="filters__buttons">
            <a onClick={this.props.onFiltersSearchClick} className="t-link-small">Поиск</a>
            <a onClick={this.props.onClearFiltersClick} className="t-link-small">Очистить</a>
          </div>
        </div>
      </div>
    )
  }
}

export default FiltersCore
