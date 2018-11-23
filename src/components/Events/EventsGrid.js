import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
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
      pagination: null,
      profileFilter: 'all',
      searchFilter: 'all',
      datepickerStartDate: null,
      datepickerEndDate: null,
      datepickerFocused: null
    }

    this.loadBy = props.type === "my-events" ? 100 : 10
    // endpoint router
    switch (props.type) {
      case "my-events":
        this.endpoint = `myEvents`
        break;
      case "news":
        this.endpoint = `news`
        break;
      default:
        this.endpoint = `events`
    }

    this.profileFilters = [
      { id: 'all', name: 'Все' },
      { id: 'my', name: 'Личные' },
      { id: 'groups', name: 'Групповые' }
    ]

    this.searchFilters = [
      { id: 'all', name: 'Все' },
      { id: 'today', name: 'Сегодня' },
      { id: 'tomorrow', name: 'Завтра' },
      { id: 'week', name: 'На этой неделе' }
    ]

  }

  componentDidMount(){
    this.getInitialEvents()
  }

  getInitialEvents = () => {
    const { type } = this.props

    // api request
    api
      .get(`${this.endpoint}?_limit=${this.loadBy}`)
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
      .get(`${this.endpoint}?_page=2&_limit=${this.loadBy}`)
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

  // calendar functions
  handleDateChange = ({startDate, endDate}) => {
    this.setState({
      datepickerStartDate: startDate,
      datepickerEndDate: endDate
    }, () => {
      const { datepickerFocused, datepickerStartDate, datepickerEndDate } = this.state

      console.log('date changed', {datepickerStartDate}, {datepickerEndDate})

      if ( datepickerFocused === null && datepickerStartDate && datepickerEndDate){
        const formatedDateRange = this.formatMomentToDate(datepickerStartDate)
        + " to " +
        this.formatMomentToDate(datepickerEndDate)

        this.setFilter(formatedDateRange, "searchFilter")

        return
      }
      if (datepickerStartDate && datepickerEndDate){
        console.log('reseting to default profile filter', Object.keys(this.profileFilters)[0].id)
        this.setFilter(Object.keys(this.profileFilters)[0].id , "searchFilter")
      }
    });
  }

  handleFocusChange = (datepickerFocused) => {
    this.setState({
      datepickerFocused
    })
  }

  handleOutsideClick = (e) => {
    if ( e.target.closest('.events__datefilter') === null ){
      this.setState({
        datepickerFocused: null
      })
    }
  }

  formatMomentToDate = (x) => {
    return x.format("YYYY-MM-DD")
  }

  toggleDatePickerVisibility = () => {
    this.setState({
      datepickerFocused: this.state.datepickerFocused ? null : "startDate"
    })
  }

  render(){
    const {
      props: {type},
      state: {data}
    } = this

    return(
      <div className="events">
        {this.renderHeader()}
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
    const {
      props: {type, isMyProfile},
      state: {profileFilter, searchFilter, datepickerStartDate, datepickerEndDate, datepickerFocused}
    } = this

    if ( type === "profile" ){
      return (
        <div className="events__header">
          <h3 className="h3-title">{isMyProfile? "Вы участвуете в событиях" : "События"}</h3>
          <div className="events__header-filter">
            { this.profileFilters.map((f, i) => (
              <span
                key={i}
                className={profileFilter === f.id ? "is-active" : ""}
                onClick={this.setFilter.bind(this, f.id, 'profileFilter')}>
                {f.name}
              </span>
            ))}
          </div>
        </div>
      )
    } else if ( type === "search" ){
      return (
        <div className="events__header events__header--bordered">
          <h3 className="h3-title">Результаты поиска</h3>
          <div className="events__header-filter events__header-filter--bordered">
            { this.searchFilters.map((f, i) => (
              <span
                key={i}
                className={searchFilter === f.id ? "is-active" : ""}
                onClick={this.setFilter.bind(this, f.id, 'searchFilter')}>
                {f.name}
              </span>
            ))}
            {/* calendar filter */}
            <span
              // eslint-disable-next-line
              className={"events__datefilter" + (/^\d{4}/.test(searchFilter) ? " is-active" : "")}>
              <div
                onClick={this.toggleDatePickerVisibility}
                className="events__datefilter-toggler">
                <SvgIcon name="calendar" />
              </div>
              <div
                className={"events__datefilter-calendar" + (datepickerFocused ? " is-active" : "")}>
                <DayPickerRangeController
                  startDate={datepickerStartDate} // momentPropTypes.momentObj or null,
                  startDateId="datepicker_start" // PropTypes.string.isRequired,
                  endDate={datepickerEndDate} // momentPropTypes.momentObj or null,
                  endDateId="datepicker_end" // PropTypes.string.isRequired,
                  onDatesChange={this.handleDateChange} // PropTypes.func.isRequired
                  focusedInput={datepickerFocused} // or null
                  onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired
                  // optional
                  // noBorder={true}
                  // block={true}
                  // hideKeyboardShortcutsPanel={true}
                  // showDefaultInputIcon={false}
                  // inputIconPosition="after"
                  // displayFormat="DD-MM-YYYY"
                  anchorDirection="right"
                  numberOfMonths={1}
                  onOutsideClick={this.handleOutsideClick}
                  isOutsideRange={(date) => {
                      if ( date < moment().subtract('days', 1) ) {
                        return true
                      }
                    }}
                  // horizontalMargin={0}
                />
              </div>
            </span>
          </div>
        </div>
      )
    } else if ( type === "my-events" ){
      return (
        <div className="events__header">
          <h3 className="h3-title">Мои события</h3>
          <div className="events__header-cta">
            <button
              onClick={this.props.openModal.bind(this, 'create-event')}
              className="btn btn-primary btn--iconed">
              <SvgIcon name="plus" />
              <span>Создать событие</span>
            </button>
          </div>
        </div>
      )
    } else if ( type === "bookmarks" ){
      return(
        <div className="events__header">
          <h3 className="h3-title">Закладки</h3>
        </div>
      )
    } else if ( type === "news" ){
      return null
    } else {
      return(
        <Fragment>
          <h3 className="h3-title">Результаты поиска</h3>
          <div className="events__header-total">Найдено 148 событий</div>
        </Fragment>
      )
    }
  }


}

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(null, mapDispatchToProps)(EventsGrid)
