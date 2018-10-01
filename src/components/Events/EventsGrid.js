import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from 'services/Api';
import EventCard from './Card/EventCard';
import Loading from '../Helpers/Loading';
import SvgIcon from '../Helpers/SvgIcon';
import { openModal } from 'actions/modal';

class EventsGrid extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: null,
      profileFilter: 'all',
      searchFilter: 'date'
    }

    this.loadBy = props.type === "my-events" ? 100 : 10
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

  setFilter = (id, name) => {
    this.setState({
      data: null, // TODO remove on prod - it change nothing now on new filter
      [name]: id
    }, () => {
      this.getInitialEvents();
    })
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
          { !data ?
            <Loading type="events" />
            :
            data.map(event => (
              <EventCard
                type={type}
                key={event.id}
                data={event} />
            ))
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


  renderHeader = () => {
    const { type, isMyProfile } = this.props
    const { profileFilter, searchFilter } = this.state

    const profileFilters = [
      { id: 'all', name: 'Все' },
      { id: 'my', name: 'Личные' },
      { id: 'groups', name: 'Групповые' }
    ]

    const searchFilters = [
      { id: 'date', name: 'Время начала' },
      { id: 'relevance', name: 'Актуальность' },
    ]

    if ( type === "profile" ){
      return (
        <React.Fragment>
          <h3 className="h3-title">{isMyProfile? "Вы участвуете в событиях" : "События"}</h3>
          <div className="events__header-filter">
            { profileFilters.map((f, i) => (
              <span
                key={i}
                className={profileFilter === f.id ? "is-active" : ""}
                onClick={this.setFilter.bind(this, f.id, 'profileFilter')}>
                {f.name}
              </span>
            ))}
          </div>
        </React.Fragment>
      )
    } else if ( type === "search" ){
      return (
        <React.Fragment>
          <h3 className="h3-title">Результаты поиска</h3>
          <div className="events__header-filter">
            { searchFilters.map((f, i) => (
              <span
                key={i}
                className={searchFilter === f.id ? "is-active" : ""}
                onClick={this.setFilter.bind(this, f.id, 'searchFilter')}>
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
    } else if ( type === "bookmarks" ){
      return(
        <React.Fragment>
          <h3 className="h3-title">Закладки</h3>
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


}

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(null, mapDispatchToProps)(EventsGrid)
