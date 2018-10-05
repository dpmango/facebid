import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import api from 'services/Api';
import SvgIcon from 'components/Helpers/SvgIcon';
import Avatar from 'components/Shared/Avatar'
import Loading from 'components/Helpers/Loading';
import {openModal} from 'actions/modal';

class RecommendedEvents extends Component{

  constructor(){
    super();

    this.state = {
      events: [],
      isFirstSlide: true,
      isLastSlide: false
    }

    this.swiperRef = null
  }

  componentDidMount(){
    this.getEvents();
  }

  getEvents = () => {
    api
      .get('recommendedEvents')
      .then(res => {
        this.setState({events: res.data})
      })
      .catch(err => {
        console.log('some error happends fetching events', err)
      })
  }

  openEvent = (id) => {
    this.props.openModal({
      name: "event",
      options: {
        eventId: id
      }
    })
  }

  nextSlide = () => {
    if (!this.swiperRef) return

    this.swiperRef.slideNext()
  }

  prevSlide = () => {
    if (!this.swiperRef) return
    this.swiperRef.slidePrev()
  }

  slideChanged = () => {
    if ( !this.swiperRef ) return

    // convert swiper ref to state
    this.setState({
      isFirstSlide: this.swiperRef.isBeginning,
      isLastSlide: this.swiperRef.isEnd
    })
  }

  render(){
    const SwiperParams = {
      // react specific params
      slideClass: 'r-event',
      // renderPrevButton: () => <button className="r-events__slider-prev"><SvgIcon name="arrow-left" /></button>,
      // renderNextButton: () => <button className="r-events__slider-next"><SvgIcon name="arrow-right" /></button>,

      direction: 'horizontal',
      watchOverflow: true,
      setWrapperSize: false,
      spaceBetween: 16,
      slidesPerView: 'auto',
      normalizeSlideIndex: true,
      freeMode: true,
      navigation: {
        nextEl: '.r-events__slider-next',
        prevEl: '.r-events__slider-prev',
      },
      slidesOffsetBefore: 24,
      slidesOffsetAfter: 24,
      on: {
        slideChange: this.slideChanged,
      },
    }

    const {events, isFirstSlide, isLastSlide} = this.state

    return(
      <div className="r-events">
        <div className="r-events__head">
          <div className="h4-title">Рекомендованные Вам</div>
          <Link
            to="/events"
            className="r-events__link-more">Показать все</Link>
          <div className="r-events__nav">
            <button
              onClick={this.prevSlide}
              className={"r-events__slider-prev" + (isFirstSlide ? " swiper-button-disabled" : "")}>
              <SvgIcon name="arrow-left" />
            </button>
            <button
              onClick={this.nextSlide}
              className={"r-events__slider-next" + (isLastSlide ? " swiper-button-disabled" : "")}>
              <SvgIcon name="arrow-right" />
            </button>
          </div>
        </div>
        <div className="r-events__grid">
          { events.length === 0 ?
            <Loading />
            :
            <div className="r-events__slider">
              <Swiper
                ref={node => this.swiperRef = node ? node.swiper : null }
                {...SwiperParams}>
                {events.map(event => (
                  <div
                    onClick={this.openEvent.bind(this, event.event.id)}
                    key={event.id}
                    className={"r-event" + (event.event.isNew ? " is-new" : "")}>
                    <div className="r-event__wrapper">
                      <div className="r-event__avatar">
                        <Avatar
                          className="avatar avatar--56"
                          user={event.user} />
                      </div>
                      <div className="r-event__contents">
                        <div className="r-event__name">{event.user.firstname}</div>
                        <div className="r-event__type">{event.event.type}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </Swiper>
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

export default connect(null, mapDispatchToProps)(RecommendedEvents)
