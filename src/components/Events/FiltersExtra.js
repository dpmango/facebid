import React, {Component} from 'react';
import Select from 'react-select';
import Checkbox from '../Forms/Checkbox';
import MapArrToSelect from 'helpers/MapArrToSelect';
import CityOptions from 'helpers/CityOptions';
import SelectLanguageOption from 'helpers/SelectLanguageOption';
import LanguageOptions from 'helpers/LanguageOptions';
// import MultipleSelectToTotal from 'helpers/MultipleSelectToTotal';

class FiltersExtra extends Component{
  render(){
    const {
      props: {categories, departure, destination, alreadyTravelling, lang_language, lang_level}
    } = this;

    if ( categories.length === 1 ){ // show this extra only when single category choosen
      if ( categories[0] === 3 ){
        return ( // render travel
          <div className="filters__extra-collapse">
            <div className="filters__extra-col filters__extra-col--select">
              <div className="ui-group">
                <label htmlFor="">Откуда:</label>
                <Select
                  name="departure"
                  multi={false}
                  removeSelected={false}
                  clearable={false}
                  searchable={true}
                  noResultsText="Не найдено"
                  autosize={false}
                  value={departure}
                  onChange={(e) => this.props.onSelectChange(e, "departure")}
                  placeholder="Откуда"
                  options={MapArrToSelect(CityOptions)} />
              </div>
            </div>
            <div className="filters__extra-col filters__extra-col--select">
              <div className="ui-group">
                <label htmlFor="">Куда:</label>
                <Select
                  name="destination"
                  multi={false}
                  removeSelected={false}
                  clearable={false}
                  searchable={true}
                  noResultsText="Не найдено"
                  autosize={false}
                  value={destination}
                  onChange={(e) => this.props.onSelectChange(e, "destination")}
                  placeholder="Куда"
                  options={MapArrToSelect(CityOptions)} />
              </div>
            </div>
            <div className="filters__extra-col filters__extra-col--checkbox">
              <div className="ui-group">
                <label htmlFor=""></label>
                <Checkbox
                  name="alreadyTravelling"
                  text="Уже отдыхаю"
                  clickHandler={this.props.onCheckboxChange.bind(this, "alreadyTravelling")}
                  value={alreadyTravelling} />
              </div>
            </div>
            <div className="filters__extra-col filters__extra-col--cta">
              <div className="ui-group">
                <label htmlFor=""></label>
                <a
                  onClick={this.props.onClearExtraFiltersClick}
                  className="t-link-small">Сбросить</a>
              </div>
            </div>
          </div>
        )
      }
      if ( categories[0] === 7 ){
        return ( // render lang exchange
          <div className="filters__extra-collapse">
            <div className="filters__extra-col filters__extra-col--select">
              <div className="ui-group">
                <label htmlFor="">Хочу выучить:</label>
                <Select
                  className="Select--country"
                  name="lang_language"
                  multi={false}
                  removeSelected={false}
                  simpleValue={false}
                  clearable={false}
                  searchable={false}
                  closeOnSelect={false}
                  autosize={false}
                  value={lang_language}
                  onChange={(e) => this.props.onSelectChange(e, "lang_language")}
                  placeholder="Выберите язык"
                  optionRenderer={SelectLanguageOption}
                  options={LanguageOptions} />
              </div>
            </div>
            <div className="filters__extra-col filters__extra-col--select">
              <div className="ui-group">
                <label htmlFor="">Мой уровень::</label>
                <Select
                  name="lang_level"
                  multi={false}
                  removeSelected={false}
                  clearable={false}
                  searchable={true}
                  noResultsText="Не найдено"
                  autosize={false}
                  value={lang_level}
                  onChange={(e) => this.props.onSelectChange(e, "lang_level")}
                  placeholder="Выберите уровень:"
                  options={MapArrToSelect([
                    "Начинающий", "Средний", "Профи"
                  ])} />
              </div>
            </div>
            <div className="filters__extra-col filters__extra-col--cta">
              <div className="ui-group">
                <label htmlFor=""></label>
                <a
                  onClick={this.props.onClearExtraFiltersClick}
                  className="t-link-small">Сбросить</a>
              </div>
            </div>
          </div>
        )
      }
    }

    return null
  }
}

export default FiltersExtra
