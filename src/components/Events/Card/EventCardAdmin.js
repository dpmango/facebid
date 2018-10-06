import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import api from 'services/Api';
import SvgIcon from 'components/Helpers/SvgIcon';
import Avatar from 'components/Shared/Avatar';
import Loading from 'components/Helpers/Loading';
import EventCardRequest from './EventCardRequest';
import FormatNumberWithSpaces from 'helpers/FormatNumberWithSpaces';

class EventCardAdmin extends Component{
  constructor(){
    super()

    this.state = {
      activeTab: 1,
      requests: [],
      requestFilter: 1,
      scope: {},
      favorites: []
    }
  }

  componentDidMount(){
    this.getScope();
    this.getRequests();
  }

  getScope = () => {
    api
      .get("eventAdminScope") // TODO - refactor with id
      .then(res => {
        this.setState({scope: res.data})
        // "totalRequests": 81,
        // "totalFavorites": 244,
        // "totalViews": 1455
      })
      .catch(err => {
        console.log('some erorr happends when fetching eventScopAdmin');
      })
  }

  getRequests = () => {
    api
      .get('eventRequests')
      .then(res => {
        this.setState({requests: res.data})
      })
      .catch(err => {
        console.log('some error happens when fetching eventRequests')
      })
  }

  getFavorites = () => {
    api
      .get('eventFavorites')
      .then(res => {
        this.setState({favorites: res.data.concat(res.data)
          .concat(res.data).concat(res.data).concat(res.data)})
      })
      .catch(err => {
        console.log('some error happends when fetching eventRequests')
      })
  }

  changeTab = (id) => {
    if ( id !== this.state.activeTab ){
      this.setState({activeTab: id})
    }

    // first switch to favorites tabs
    if ( id === 2 && this.state.favorites.length === 0 ){
      this.getFavorites();
    }
  }

  changeRequestFilter = (id) => {
    this.setState({
      requestFilter: id
    }, () => this.getRequests())
  }

  // header cta button click
  promoteEventToTop = () => {

  }


  render(){
    const {
      props: {actionFlag},
      state: {scope, activeTab, requests, requestFilter, favorites}
    } = this;

    if ( actionFlag !== "isPublished" &&
         actionFlag !== "isPublishedAdvertised" &&
         actionFlag !== "isPublishedTop"
    ) {
      return null
    }

    return(
      <div className="ec-admin">
        <div className="ec-admin__header">
          <div className="ec-admin__nav">
            <div
              onClick={this.changeTab.bind(this, 1)}
              className={"ec-admin__nav-el" + (activeTab === 1 ? " is-active" : "")}>
              <div className="ec-admin__nav-icon">
                <span className="ico-blue-circle">
                  <SvgIcon name="checkmark" />
                </span>
              </div>
              <span className="ec-admin__nav-title">Заявки</span>
              <span className="ec-admin__nav-counter">{scope.totalRequests}</span>
              { scope.newRequests &&
                <span className="ico-blue-circle ec-admin__nav-mark"><span>+{scope.newRequests}</span></span>
              }
            </div>
            <div
              onClick={this.changeTab.bind(this, 2)}
              className={"ec-admin__nav-el" + (activeTab === 2 ? " is-active" : "")}>
              <div className="ec-admin__nav-icon">
                <SvgIcon name="bookmark" />
              </div>
              <span className="ec-admin__nav-title">В избранном</span>
              <span className="ec-admin__nav-counter">{scope.totalFavorites}</span>
            </div>
            <div
              className="ec-admin__nav-el is-static">
              <div className="ec-admin__nav-icon">
                <SvgIcon name="eye" />
              </div>
              <span className="ec-admin__nav-title">Просмотров</span>
              <span className="ec-admin__nav-counter">{FormatNumberWithSpaces(scope.totalViews)}</span>
            </div>
          </div>
          <div className="ec-admin__header-cta">
            <button
              className="btn btn-primary btn--iconed"
              onClick={this.promoteEventToTop} >
              <SvgIcon name="rocket" />
              <span>Поднять в топ</span>
            </button>
          </div>
        </div>

        <PerfectScrollbar
          className="scrollbar-blue scrollbar-blue--modal ec-admin__scrollable"
          option={{
            wheelSpeed: 1,
            wheelPropagation: true,
            suppressScrollX: true}}>
          <div
            className={"ec-admin__tab" + (activeTab === 1 ? " is-active" : "")}>
            <div className="ec-requests">
              <div className="ec-requests__header">
                <div className="h4-title">Заявки на событие</div>
                <div className="ec-requests__filters">
                  <div
                    onClick={this.changeRequestFilter.bind(this, 1)}
                    className={"ec-requests__filter" + (requestFilter === 1 ? " is-active" : "")}>Все заявки</div>
                  <div
                    onClick={this.changeRequestFilter.bind(this, 2)}
                    className={"ec-requests__filter" + (requestFilter === 2 ? " is-active" : "")}>Подтвержденные</div>
                  <div
                    onClick={this.changeRequestFilter.bind(this, 3)}
                    className={"ec-requests__filter" + (requestFilter === 3 ? " is-active" : "")}>Отклоненные</div>
                </div>
              </div>
              {requests.length > 0 ? requests.map(request => (
                <EventCardRequest
                  key={request.id}
                  request={request} />
                ))
                : <Loading />
              }
            </div>
          </div>
          <div
            className={"ec-admin__tab" + (activeTab === 2 ? " is-active" : "")}>
            <div className="ec-favorites">
              {favorites.length > 0 ? favorites.map((fav, index) => (
                <div
                  key={index}
                  className="ec-favorites__col">
                  <Link
                    to={`/profile/${fav.user.id}`}
                    className="ec-favorite">
                    <Avatar
                      className="ec-favorite__avatar avatar avatar--80"
                      user={fav.user} />
                    <div className="ec-favorite__name">{fav.user.username}</div>
                    <div className="ec-favorite__location">{fav.user.location}</div>
                  </Link>
                </div>
                ))
                : <Loading />
              }
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    )
  }
}

export default EventCardAdmin
