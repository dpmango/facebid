import React, {Component} from 'react';
import {connect} from 'react-redux';
import Swiper from 'react-id-swiper';
import api from 'services/Api';
import SvgIcon from 'components/Helpers/SvgIcon';
import Image from 'components/Helpers/Image';
import Loading from 'components/Helpers/Loading';
import {openModal} from 'actions/modal';

class SelectEvent extends Component{

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
      .get('inviteEvents')
      .then(res => {
        this.setState({events: res.data})
      })
      .catch(err => {
        console.log('some error happends fetching events', err)
      })
  }

  // open event modal
  openEvent = (id) => {
    this.props.openModal({
      name: "event",
      options: {
        eventId: id
      }
    })
  }

  // swiper custom controlls
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
      slideClass: 'i-event',
      direction: 'horizontal',
      watchOverflow: true,
      setWrapperSize: false,
      spaceBetween: 16,
      slidesPerView: 'auto',
      normalizeSlideIndex: true,
      freeMode: true,
      slidesOffsetBefore: 24,
      slidesOffsetAfter: 24,
      on: {
        slideChange: this.slideChanged,
      },
    }

    const {
      state: { events, isFirstSlide, isLastSlide },
      props: { selected }
    } = this

    return(
      <div className="r-events r-events--invite">
        <div className="r-events__head">
          <div className="h4-title">Выберите событие</div>
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
                    onClick={this.props.onSelectEvent.bind(this, event.id)}
                    key={event.id}
                    className={"i-event" + ((selected === event.id) && " is-selected")}>
                    <div className="i-event__image">
                      <Image file={event.image} />
                    </div>
                    <div className="i-event__selector">
                      <SvgIcon name="checkmark" />
                    </div>
                    <div className="i-event__contents">
                      <div className="i-event__title">{event.title}</div>
                      <div className="i-event__cta">
                        <button
                          onClick={this.openEvent.bind(this, event.id)}
                          className="btn btn-outline btn-outline--white">
                          Подробнее
                        </button>
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

export default connect(null, mapDispatchToProps)(SelectEvent)
