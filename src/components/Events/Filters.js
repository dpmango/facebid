import React, {Component} from 'react';
import SvgIcon from '../../components/Helpers/SvgIcon';
import FilterSlider from './FilterSlider';

class Filters extends Component {
  createEventClick = () => {

  }

  clearFiltersClick = () => {

  }

  render(){
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
              <div className="ui-input">
                <input type="text"/>
              </div>
            </div>
          </div>
          <div className="filters__options-col filters__options-col--gender">
            <div className="ui-group">
              <label htmlFor="">В радиусе</label>
              <div className="ui-input">
                <input type="text"/>
              </div>
            </div>
          </div>
          <div className="filters__options-col filters__options-col--gender">
            <div className="ui-group">
              <label htmlFor="">Возраст</label>
              <div className="ui-input">
                <input type="text"/>
              </div>
            </div>
          </div>
          <div className="filters__options-col filters__options-col--gender">
            <div className="ui-group">
              <label htmlFor="">Языки</label>
              <div className="ui-input">
                <input type="text"/>
              </div>
            </div>
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
