import React, {Component} from 'react';
import api from '../../services/Api';
import EventCard from './EventCard';
import Loading from '../Helpers/Loading';

class EventsGrid extends Component {
  constructor(){
    super();

    this.state = {
      data: null
    }
  }

  componentDidMount(){
    api
      .get('events')
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(err => {
        console.log(`Something wrong happens - ${err.data}`, err)
      })
  }

  render(){
    const { data } = this.state

    return(
      <div className="events">
        <div className="events__header">
          <h3 className="h3-title">Результаты поиска</h3>
          <div className="events__header-total">Найдено 148 событий</div>
        </div>
        <div className="events__grid">
          { !data &&
            <Loading />
          }
          { data &&
            data.map(event => {
              return (
                <EventCard
                  key={event.id}
                  data={event} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default EventsGrid
