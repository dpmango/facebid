import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from '../../services/Api';
import EventCard from './EventCard';
import Loading from '../Helpers/Loading';
import SvgIcon from '../Helpers/SvgIcon';
import { openModal } from '../../actions/modal';

class EventsGrid extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: null,
      filter: 'all'
    }

    this.loadBy = props.type === "my-events" ? 100 : 2
  }

  componentDidMount(){
    this.getInitialEvents()
  }

  getInitialEvents = () => {
    const { type } = this.props

    // endpoint router
    let endpoint
    switch (type) {
      case "my-events":
        endpoint = `myEvents?_limit=${this.loadBy}`
        break;
      default:
        endpoint = `events?_limit=${this.loadBy}`
    }

    // api request
    console.log(`requesting to ${endpoint}`)
    api
      .get(endpoint)
      .then(res => {
        this.setState({data: res.data})
      })
      .catch(err => {
        console.log(`Something wrong happens - ${err.data}`, err)
      })
  }

  loadMore = () => {
    // offset ??
    api
      .get(`events?_page=2&_limit=${this.loadBy}`)
      .then(res => {
        this.setState({
          data: this.state.data.concat(res.data)
        })
      })
      .catch(err => {
        console.log(`Something wrong happens - ${err.data}`, err)
      })
  }

  setFilter = (id) => {
    this.setState({
      data: null, // TODO remove on prod - it change nothing now on new filter
      filter: id
    }, () => {
      this.getInitialEvents();
    })
  }

  renderHeader = () => {
    const { type, isMyProfile } = this.props
    const { filter } = this.state

    const filters = [
      { id: 'all', name: 'Все' },
      { id: 'my', name: 'Личные' },
      { id: 'groups', name: 'Групповые' }
    ]

    if ( type === "profile" ){
      return (
        <React.Fragment>
          <h3 className="h3-title">{isMyProfile? "Вы участвует в событиях" : "События"}</h3>
          <div className="events__header-filter">
            { filters.map((f, i) => (
              <span
                key={i}
                className={filter === f.id ? "is-active" : ""}
                onClick={this.setFilter.bind(this, f.id)}>
                {f.name}
              </span>
            ))}
          </div>
        </React.Fragment>
      )
    } else if ( type === "my-events" ){
      return (
        <React.Fragment>
          <h3 className="h3-title">Мои события</h3>
          <div className="events__header-cta">
            <button
              onClick={this.props.openModal.bind(this, 'create-event')}
              className="btn btn-primary btn--iconed">
              <SvgIcon name="plus" />
              <span>Создать событие</span>
            </button>
          </div>
        </React.Fragment>
      )
    } else {
      return(
        <React.Fragment>
          <h3 className="h3-title">Результаты поиска</h3>
          <div className="events__header-total">Найдено 148 событий</div>
        </React.Fragment>
      )
    }
  }

  render(){
    const {
      props: {type},
      state: {data}
    } = this

    return(
      <div className="events">
        <div className="events__header">
          {this.renderHeader()}
        </div>
        <div className="events__grid">
          { !data &&
            <Loading type="events" />
          }
          { data &&
            data.map(event => {
              return (
                <EventCard
                  type={type}
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

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(null, mapDispatchToProps)(EventsGrid)
