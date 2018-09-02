import React, {Component} from 'react';
import api from '../../services/Api';
import EventCard from './EventCard';
import Loading from '../Helpers/Loading';
import SvgIcon from '../Helpers/SvgIcon';

class EventsGrid extends Component {
  constructor(){
    super();

    this.state = {
      data: null
    }
  }

  componentDidMount(){
    api
      .get('events?_limit=2')
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(err => {
        console.log(`Something wrong happens - ${err.data}`, err)
      })
  }

  loadMore = () => {
    // offset ??
    api
      .get('events?_page=2&_limit=2')
      .then(res => {
        this.setState({
          data: this.state.data.concat(res.data)
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
          { data &&
            <div className="events__load-more">
              <button
                className="btn btn-primary btn--iconed"
                onClick={this.loadMore}
                >
                  <SvgIcon name="refresh" />
                  <span>Показать еще</span>
                </button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default EventsGrid
