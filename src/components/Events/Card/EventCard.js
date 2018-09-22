import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import anime from 'animejs'
import PerfectScrollbar from 'react-perfect-scrollbar';
import throttle from 'lodash/throttle';
import api from 'services/Api';
import SvgIcon from 'components/Helpers/SvgIcon';
import GetCoordsOnDocument from 'services/GetCoordsOnDocument';
import GetWindowScroll from 'services/GetWindowScroll';
import EventCardMedia from './EventCardMedia';
import EventCardTop from './EventCardTop';
import EventCardCta from './EventCardCta';
import EventCardDate from './EventCardDate';
import EventCardAction from './EventCardAction';
import Comments from './Comments';
import CreateComment from './CreateComment'

class EventCard extends Component {

  constructor(props){
    super(props);

    this.actionFlag = props.data.flags ?
      Object.keys(props.data.flags).filter(x => props.data.flags[x])[0]
      : null

    this.state = {
      comments: [],
      shouldCtaStick: false,
      computeSticky: {},
      stickyPoint: null,
      isCommentsVisible: false,
      actionFlag: this.actionFlag
    }

    this.ctaRef = React.createRef();

    // this.scrollWindow = throttle(this.handleWindowScroll, 10);
    this.scrollWindow = this.handleWindowScroll

    this.isMyEvent = props.type === "my-events"

    this.isDeclined = this.actionFlag === "isDeclined"
  }

  componentDidMount(){
    this.getComments() // pass id on prod
    window.addEventListener('scroll', this.scrollWindow, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollWindow, false);
  };

  getComments = (id) => {

    // TODO
    // REMOVE WHEN API WILL RETURN ACTUALL COMMENTS
    if (
      this.state.actionFlag === "isModerationPening" ||
      this.state.actionFlag === "isModerationFailed" ||
      this.state.actionFlag === "isDeclined"
    ){
      return
    }

    api
      .get('comments')
      .then(res => {
        this.setState({ comments: res.data })
      })
      .catch(err => {
        console.log('some error happens', err)
      })
  }

  onScroll = (container) => {

    const { shouldCtaStick, stickyPoint, isCommentsVisible } = this.state

    const scrollDistance = container.scrollTop
    const ctaPosTop = stickyPoint ? stickyPoint : this.ctaRef.current.offsetTop

    if ( scrollDistance >= ctaPosTop ){
      if ( !shouldCtaStick ){

        let containerPosition = GetCoordsOnDocument(container)
        let saveContainerTop = containerPosition.top
        containerPosition.top = containerPosition.top - GetWindowScroll().top
        const containerWidth = container.offsetWidth

        this.setState({
          shouldCtaStick: true,
          stickyPoint: scrollDistance,
          containerTop: saveContainerTop,
          computeSticky: {
            top: containerPosition.top,
            left: containerPosition.left,
            width: containerWidth
          }
        })

      }
    } else {
      this.setState({
        shouldCtaStick: false,
        stickyPoint: null,
        computeSticky: {}
      })
    }

    // show/hide comments logic
    if ( scrollDistance > 20 ){
      if ( !isCommentsVisible ) {
        this.setState({ isCommentsVisible: true })
      }
    } else {
      if ( isCommentsVisible ){
        this.setState({ isCommentsVisible: false })
      }
    }

  }

  scrollToTop = (instant) => {
    // instant could be an event or flag
    // that's why duration is checked against flag
    anime({
      targets: this._scrollRef,
      scrollTop: 0,
      easing: [0.77, 0, 0.175, 1],
      duration: instant === true ? 0 : 500
    });

    // this._scrollRef.scrollTop = 0;
  }

  // when window is scrolled
  handleWindowScroll = () => {
    const { shouldCtaStick } = this.state;

    if ( shouldCtaStick ){
      // when user scroll the window and it's a sticky CTA
      // adjust position fixed as the el is window fixed
      // let newTop = this.state.containerTop
      // newTop = newTop - GetWindowScroll().top
      //
      // this.setState({
      //   ...this.state,
      //   computeSticky: {
      //     ...this.state.computeSticky,
      //     top: newTop
      //   }
      // })

      // animation is still jerky - scrollTop for now
      this.scrollToTop(true);

    }
  }

  // outside method via onRef
  onCommentReplyClick = (username) => {
    this.createCommentRef.appendUserMention(username);
  }

  render(){

    const {
      props: {
        data: {
          id,
          images,
          user,
          name,
          from,
          date,
          to,
          desc,
          isRemoved
        },
        type
      },
      state: {
        comments,
        shouldCtaStick,
        computeSticky,
        isCommentsVisible,
        actionFlag
      }
    } = this

    return(
      <div
        className={"e-card" +
          (this.isMyEvent ? " e-card--my-event" : "") +
          (this.isDeclined ? " e-card--declined" : "") +
          (isRemoved ? " e-card--removed" : "")
        }>
        <EventCardAction
          actionFlag={actionFlag} />

        <div className="e-card__wrapper">
          { isRemoved &&
            <div className="e-card__removed">
              <SvgIcon name="removed" />
              <span>Событие удалено</span>
            </div>
          }
          <EventCardMedia
            data={images} />

          <div className="e-card__contents">
            <div className={"e-card__contents-wrapper" + (shouldCtaStick ? " should-stick" : "") }>

              <EventCardTop
                type={type}
                actionFlag={actionFlag}
                id={id}
                user={user} />

              <PerfectScrollbar
                className="scrollbar-blue e-card__scrollable"
                option={{
                  wheelSpeed: 1,
                  wheelPropagation: false,
                  suppressScrollX: true,
                }}
                onScrollY={throttle(this.onScroll, 20)}
                containerRef={(ref) => { this._scrollRef = ref }} >

                <div className="e-card__head">
                  <div className="e-card__title">{name}</div>
                  <div className="e-card__event-line">
                    <span>{from}</span>
                    <i className="icon icon-plane"></i>
                    <span>{to}</span>
                  </div>
                  <EventCardDate
                    baseClass="e-card__date"
                    date={date} />
                </div>
                <div className="e-card__desc">{desc}</div>
                {/* cta (sticky on scroll) */}
                <div
                  style={shouldCtaStick ? {
                    top: `${computeSticky.top}px`,
                    left: `${computeSticky.left}px`,
                    width: `${computeSticky.width}px`
                  } : null }
                  className="e-card__cta"
                  ref={this.ctaRef}>
                  <EventCardCta
                    actionFlag={actionFlag}
                    onScrollTopClick={this.scrollToTop} />
                </div>
                <Comments
                  onReplyClick={this.onCommentReplyClick}
                  comments={comments} />
              </PerfectScrollbar>
              <CreateComment
                haveComments={comments.length > 0}
                isVisible={isCommentsVisible}
                onRef={ref => (this.createCommentRef = ref)}
                onNewComment={this.getComments}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EventCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default EventCard
