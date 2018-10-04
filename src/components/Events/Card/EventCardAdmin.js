import React, {Component, Fragment} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import api from 'services/Api';
import SvgIcon from 'components/Helpers/SvgIcon';
import EventCardRequest from './EventCardRequest';

class EventCardAdmin extends Component{
  constructor(){
    super()

    this.state = {
      activeTab: 1,
      requests: [],
      requestFilter: 1
    }
  }

  componentDidMount(){
    this.getRequest();
  }

  getRequest = () => {
    api
      .get('eventRequests')
      .then(res => {
        this.setState({requests: res.data})
      })
  }

  changeTab = (id) => {
    if ( id !== this.state.activeTab ){
      this.setState({activeTab: id})
    }
  }

  changeRequestFilter = (id) => {
    this.setState({
      requestFilter: id
    }, () => this.getRequest())
  }

  // header cta button click
  promoteEventToTop = () => {

  }


  render(){
    const {
      state: {activeTab, requests, requestFilter}
    } = this;

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
              <span className="ec-admin__nav-counter">81</span>
              <span className="ico-blue-circle ec-admin__nav-mark"><span>+3</span></span>
            </div>
            <div
              onClick={this.changeTab.bind(this, 2)}
              className={"ec-admin__nav-el" + (activeTab === 2 ? " is-active" : "")}>
              <div className="ec-admin__nav-icon">
                <SvgIcon name="bookmark" />
              </div>
              <span className="ec-admin__nav-title">В избранном</span>
              <span className="ec-admin__nav-counter">81</span>
            </div>
            <div
              className="ec-admin__nav-el is-static">
              <div className="ec-admin__nav-icon">
                <SvgIcon name="eye" />
              </div>
              <span className="ec-admin__nav-title">Просмотров</span>
              <span className="ec-admin__nav-counter">1 412</span>
            </div>
          </div>
          <div className="ec-admin__header-cta">
            <button
              className="btn btn-primary btn--iconed"
              onClick={this.promoteEventToTop}
              >
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
              {requests.length > 0 && requests.map(request => (
                <EventCardRequest
                  key={request.id}
                  request={request} />
              ))}
            </div>
          </div>
          <div
            className={"ec-admin__tab" + (activeTab === 2 ? " is-active" : "")}>

          </div>
        </PerfectScrollbar>
      </div>
    )
  }
}

export default EventCardAdmin
