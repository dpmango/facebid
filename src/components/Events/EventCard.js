import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import anime from 'animejs'
import PerfectScrollbar from 'react-perfect-scrollbar';
import throttle from 'lodash/throttle'
import SvgIcon from '../Helpers/SvgIcon';
import api from '../../services/Api';
import ConvertMonthNumToName from '../../services/ConvertMonthNumToName';
import GetCoordsOnDocument from '../../services/GetCoordsOnDocument';
import GetWindowScroll from '../../services/GetWindowScroll';
import EventCardMedia from './EventCardMedia';
import EventCardTop from './EventCardTop';
import AvatarList from '../People/AvatarList';
import Comments from './Comments';
import CreateComment from './CreateComment'

class EventCard extends Component {

  constructor(){
    super();

    this.state = {
      comments: [],
      userMention: null, // to be passed into create
      shouldCtaStick: false,
      computeSticky: {},
      stickyPoint: null
    }

    this.ctaRef = React.createRef();

    // this.scrollWindow = throttle(this.handleWindowScroll, 10);
    this.scrollWindow = this.handleWindowScroll
  }

  componentDidMount(){
    this.getComments() // pass id on prod
    window.addEventListener('scroll', this.scrollWindow, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollWindow, false);
  };

  getComments = (id) => {
    api
      .get('comments')
      .then(res => {
        this.setState({ comments: res.data })
      })
      .catch(err => {
        console.log('some error happens', err)
      })
  }

  convertDate = (str) => {
    const date = str.substring(0,2)
    const month = ConvertMonthNumToName(str.substring(2))

    return (
      <React.Fragment>
        <span>{date}</span>
        <span>{month}</span>
      </React.Fragment>
    )
  }

  onScroll = (container) => {

    const { shouldCtaStick, stickyPoint } = this.state

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

  }

  scrollToTop = (instant) => {
    anime({
      targets: this._scrollRef,
      scrollTop: 0,
      easing: [0.77, 0, 0.175, 1],
      duration: instant ? 0 : 500
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

  onCommentReplyClick = (username) => {
    this.createCommentRef.appendUserMention(username);

    // this.setState({
    //   userMention: username
    // })
  }

  render(){

    const avatars = {
      more: 14,
      list: [
        { id: 1, file: "userAvatar_2.jpg" },
        { id: 2, file: "userAvatar_3.jpg" },
        { id: 3, file: "userAvatar_4.jpg" },
        { id: 4, file: "userAvatar_5.jpg" },
        { id: 5, file: "userAvatar_6.jpg" }
      ]
    }

    const {
      props: {
        data: {
          images,
          user,
          name,
          from,
          date,
          to,
          desc
        }
      },
      state: {
        comments, userMention, shouldCtaStick, computeSticky
      }
    } = this

    return(
      <div className="e-card">
        <div className="e-card__wrapper">

          <EventCardMedia data={images} />

          <div className="e-card__contents">
            <div className={"e-card__contents-wrapper" + (shouldCtaStick ? " should-stick" : "") }>

              <EventCardTop user={user} />

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
                  <div className="e-card__date">
                    {this.convertDate(date)}
                  </div>
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
                  <div className="e-card__cta-wrapper">
                    <button className="btn btn-primary btn--iconed">
                      <SvgIcon name="checkmark" />
                      <span>Участвовать</span>
                    </button>
                    <div className="e-card__partisipants">
                      <AvatarList
                        avatars={avatars} />
                    </div>
                    <div
                      onClick={this.scrollToTop}
                      className="e-card__scrolltop">
                      <SvgIcon name="up-arrow" />
                    </div>
                  </div>
                </div>
                <Comments
                  onReplyClick={this.onCommentReplyClick}
                  comments={comments} />
              </PerfectScrollbar>
              <CreateComment
                onRef={ref => (this.createCommentRef = ref)}
                mentionUser={userMention}
                onNewComment={this.getComments}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventCard
