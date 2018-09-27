import React, {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SvgIcon from 'components/Helpers/SvgIcon';

class EventCardAdmin extends Component{
  constructor(){
    super()

    this.state = {
      activeTab: 1
    }
  }

  changeTab = (id) => {
    if ( id !== this.state.activeTab ){
      this.setState({activeTab: id})
    }
  }

  // header cta button click
  promoteEventToTop = () => {

  }

  render(){
    const {
      state: {activeTab}
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
