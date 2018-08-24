import React, {Component} from 'react';
// import SvgIcon from '../../components/Helpers/SvgIcon';
import EventCard from './EventCard';

class EventsGrid extends Component {

  render(){
    return(
      <div className="events">
        <div className="events__header">
          <h3 class="h3-title">Результаты поиска</h3>
          <div className="events__header-total">Найдено 148 событий</div>
        </div>
        <div className="events__grid">
          <EventCard />
          <EventCard />
        </div>
      </div>
    )
  }
}

export default EventsGrid
