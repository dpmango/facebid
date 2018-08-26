import React, {Component} from 'react';
import SvgIcon from '../../components/Helpers/SvgIcon';
import FilterSlider from './FilterSlider';
// import Select from '../Forms/Select';
import Select from 'react-select';

class Filters extends Component {
  constructor(){
    super()

    this.state = {
      gender: null
    }
  }

  createEventClick = () => {

  }

  clearFiltersClick = () => {

  }

  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  render(){

    const {
      state: {
        gender
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
                className="Select-main"
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
          <div className="filters__options-col filters__options-col--radius">
            <div className="ui-group">
              <label htmlFor="">В радиусе</label>
              <div className="ui-input">
                <input type="text"/>
              </div>
            </div>
          </div>
          <div className="filters__options-col filters__options-col--age">
            <div className="ui-group">
              <label htmlFor="">Возраст</label>
              <div className="ui-input">
                <input type="text"/>
              </div>
            </div>
          </div>
          <div className="filters__options-col filters__options-col--languages">
            <div className="ui-group">
              <label htmlFor="">Языки</label>
              <div className="ui-input">
                <input type="text"/>
              </div>
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
