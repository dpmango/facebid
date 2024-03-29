import React, {Component} from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs'
import PerfectScrollbar from 'react-perfect-scrollbar';
import throttle from 'lodash/throttle';
import api from 'services/Api';
import SvgIcon from 'components/Helpers/SvgIcon';
import GetCoordsOnDocument from 'services/GetCoordsOnDocument';
import GetWindowScroll from 'services/GetWindowScroll';
import EventCardMedia from './EventCardMedia';
import EventCardInfo from './EventCardInfo';
import EventCardTop from './EventCardTop';
import EventCardCta from './EventCardCta';
import EventCardAction from './EventCardAction';
import EventCardAdmin from './EventCardAdmin';
import EventCardNotificaiton from './EventCardNotificaiton';
import EditModeButtons from './EditModeButtons';
import Comments from './Comments';
import CreateComment from './CreateComment'

class EventCard extends Component {
  constructor(props){
    super(props);

    this.actionFlag = props.data.flags ?
      Object.keys(props.data.flags).filter(x => props.data.flags[x])[0]
      : null

    this.state = {
      editMode: false,
      data: {
        name: props.data.name,
        desc: props.data.desc,
        images: props.data.images
      },
      comments: [],
      shouldCtaStick: false,
      computeSticky: {},
      stickyPoint: null,
      isCommentingVisible: false,
      actionFlag: this.actionFlag,
      shareContents: {
        facebook: {
          quote: props.data.name,
          hashtag: "facebid"
        },
        vkontakte: {
          title: props.data.name,
          description: props.data.desc,
          image: props.data.images[0]
        },
        twitter: {
          title: props.data.name,
          hashtags: ["facebid"],
          via: undefined
        }
      }
    }

    this.ctaRef = React.createRef();

    // this.scrollWindow = throttle(this.handleWindowScroll, 10);
    this.scrollWindow = this.handleWindowScroll

    this.isMyEvents = props.type === "my-events";
    this.isNews = props.type === "news";
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

  scrollableMouseEnter = () => {
    if ( !this.state.isCommentingVisible )
      this.setState({isCommentingVisible: true})
  }

  scrollableMouseLeave = () => {
    if ( this.state.isCommentingVisible )
      this.setState({isCommentingVisible: false})
  }

  // outside method via onRef
  commentReplyClick = (username) => {
    this.createCommentRef.appendUserMention(username);
  }

  commentRemove = (id) => {
    this.setState({
      ...this.state,
      comments: this.state.comments.filter(x => x.id !== id)
    })
  }

  // EDIT FUNCTIONS

  saveEventData = (newState) => {
    // newState lifted up when form is saved
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        name: newState.e_name,
        desc: newState.e_desc
      },
      shareContents: {
        ...this.state.shareContents,
        facebook: {
          ...this.state.shareContents.facebook,
          quote: newState.e_name
        },
        vkontakte: {
          ...this.state.shareContents.vkontakte,
          title: newState.e_name,
          description: newState.e_desc,
          // image: props.data.images[0] // TODO
        },
        twitter: {
          ...this.state.shareContents.twitter,
          title: newState.e_name,
        }
      }

    }, () => {
      this.disableEdit()
    })

  }

  enableEditMode = () => {
    this.setState({editMode: true})
  }

  disableEditButtonClick = (e) => {
    e.preventDefault()
    e.stopPropagation();

    this.disableEdit()
  }

  disableEdit = () => {
    this.setState({ editMode: false }, () => {
      // this.galleryRef.refreshSliders()
    })
  }

  // function is called from buttons
  // and trigger form submission in edit mode
  triggerSave = () => {
    this.cardInforef.submitForm()
  }

  render(){
    const {
      props: {
        data: {
          id,
          // images,
          user,
          // name,
          from,
          date,
          to,
          location,
          // desc,
          notification,
          isRemoved
        },
        type
      },
      state: {
        editMode,
        data: {
          name,
          desc,
          images
        },
        comments,
        shouldCtaStick,
        computeSticky,
        isCommentingVisible,
        actionFlag,
        shareContents
      }
    } = this

    return(
      <div
        className={"e-card" +
          ((this.isMyEvents || this.isNews) ? " e-card--white-head" : "") +
          (this.isDeclined ? " e-card--declined" : "") +
          (type === "bookmarks" && isRemoved ? " e-card--removed" : "")
        }>
        { type === "news" &&
          <EventCardNotificaiton
            notification={notification} />
        }
        <EventCardAction
          shareContents={shareContents}
          actionFlag={actionFlag} />

        <div className="e-card__wrapper">
          { type === "bookmarks" && isRemoved &&
            <div className="e-card__removed">
              <SvgIcon name="removed" />
              <span>Событие удалено</span>
            </div>
          }
          <EventCardMedia
            editMode={editMode}
            data={images} />

          <div className="e-card__contents">
            <div
              onMouseEnter={this.scrollableMouseEnter}
              onMouseLeave={this.scrollableMouseLeave}
              className={"e-card__contents-wrapper" + (shouldCtaStick ? " should-stick" : "") }>
              { !this.isMyEvents &&
                <EventCardTop
                  type={type}
                  actionFlag={actionFlag}
                  id={id}
                  user={user}
                  shareContents={shareContents} />
              }

              <PerfectScrollbar
                className="scrollbar-blue e-card__scrollable"
                option={{
                  wheelSpeed: 1,
                  wheelPropagation: false,
                  suppressScrollX: true,
                }}
                onScrollY={throttle(this.onScroll, 20)}
                containerRef={(ref) => { this._scrollRef = ref }} >

                <EventCardInfo
                  editMode={editMode}
                  name={name}
                  from={from}
                  to={to}
                  location={location}
                  date={date}
                  desc={desc}
                  onRef={ref => (this.cardInforef = ref)}
                  onSave={this.saveEventData} />

                <div
                  style={shouldCtaStick ? {
                    top: `${computeSticky.top}px`,
                    left: `${computeSticky.left}px`,
                    width: `${computeSticky.width}px`
                  } : null }
                  className="e-card__cta"
                  ref={this.ctaRef}>
                  <EventCardCta
                    id={id}
                    editMode={editMode}
                    actionFlag={actionFlag}
                    onEditModeClick={this.enableEditMode}
                    onScrollTopClick={this.scrollToTop} />
                </div>
                <Comments
                  editMode={editMode}
                  eventAuthor={user.id}
                  onReplyClick={this.commentReplyClick}
                  onCommentRemove={this.commentRemove}
                  comments={comments} />
              </PerfectScrollbar>

              <EditModeButtons
                editMode={editMode}
                onSave={this.triggerSave}
                onCancel={this.disableEditButtonClick} />

              <CreateComment
                editMode={editMode}
                haveComments={comments.length > 0}
                isVisible={isCommentingVisible}
                onRef={ref => (this.createCommentRef = ref)}
                onNewComment={this.getComments} />
            </div>
          </div>
        </div>

        { this.isMyEvents &&
          <EventCardAdmin
            actionFlag={actionFlag}/>
        }
      </div>
    )
  }
}

EventCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default EventCard
