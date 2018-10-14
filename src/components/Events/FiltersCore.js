import React, {Component} from 'react';
import Slider, {Range} from 'rc-slider';
import Select from 'react-select';
import MultipleSelectToTotal from 'helpers/MultipleSelectToTotal';
import SelectLanguageOption from 'helpers/SelectLanguageOption';
import LanguageOptions from 'helpers/LanguageOptions';

class FiltersCore extends Component{
  render(){
    const {
      gender, range, age, languages
    } = this.props

    return(
      <div className="filters__options-collapse">
        <div className="filters__options-col filters__options-col--gender">
          <div className="ui-group">
            <label htmlFor="">Показывать</label>
            <Select
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
                onChange={this.props.onRangeChange('range')} />
            </div>
          </div>
        </div>
        <div className="filters__options-col filters__options-col--age">
          <div className="ui-group">
            <label htmlFor="">Возраст</label>
            <div className="ui-slider">
              <div className="ui-slider__info">
                <div className="ui-slider__val">{age[0]}</div>
                <div className="ui-slider__val ui-slider__val--right">{age[1] === 50 ? "50+" : age[1]}</div>
                {/* <div className="ui-slider__name">км</div> */}
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
        <div className="filters__options-col filters__options-col--languages">
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
        </div>
        <div className="filters__options-col filters__options-col--clear">
          <a onClick={this.props.onClearFiltersClick} className="t-link-small">Очистить</a>
        </div>
      </div>
    )
  }
}

export default FiltersCore
