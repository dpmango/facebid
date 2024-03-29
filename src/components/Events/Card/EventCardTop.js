import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { notify } from 'reapop';
// import DefaultNotification from '/helpers/DefaultNotification';
import SvgIcon from 'components/Helpers/SvgIcon';
import Avatar from 'components/Shared/Avatar';
import Dropdown from 'components/Interface/Dropdown';
import { openModal } from 'actions/modal';

class EventCardTop extends Component {

  constructor(props){
    super(props)

    this.state = {
      isBookmarked: props.type === "bookmarks" ? true : false, // TODO - tmp, change to API resp
      showMore: false
    }
  }

  bookmarkAction = () => {
    const { isBookmarked } = this.state;
    const { notify, userId } = this.props;

    if ( !userId ){
      this.props.openModal('signup');
      return
    }

    if ( !isBookmarked ){
      this.setState({
        isBookmarked: true
      }, () => {
        notify({
          title: 'Добавлено в избранное',
          message: 'Событие добавлено в избранное',
          status: 'default', // default, info, success, warning, error
          dismissible: true,
          dismissAfter: 2000,
        })
      })
    } else {
      this.setState({
        isBookmarked: false
      }, () => {
        notify({
          title: 'Удалено из избранного',
          message: 'Событие удалено из избранного',
          status: 'default', // default, info, success, warning, error
          dismissible: true,
          dismissAfter: 2000,
        })
      })
    }

    // console.log(this.props.notify)

    // + API call
  }

  shareAction = () => {
    this.props.openModal({
      name: 'share-event',
      options: {
        eventId: this.props.id,
        shareContents: this.props.shareContents
      }
    })
  }

  moreAction = () => {
    this.setState({
      showMore: !this.state.showMore
    })
  }

  render(){
    const {
      props: { user, actionFlag},
      state: { isBookmarked }
    } = this;

    return(
      <div className="e-card__top">
        <Link
          to={`/profile/${user.id}`}
          className="e-card__user">
          <Avatar
            user={user} />
          <div className="e-card__user-info">
            <div className="e-card__user-line">
              <div className="e-card__user-name">{user.name}, {user.age}</div>
              <div className="e-card__user-status">
                {user.isVerified &&
                  <div className="icon-verified">
                    <SvgIcon name="checkmark" />
                  </div>
                }
              </div>
            </div>
            <div className="e-card__user-distance">{user.distance}</div>
          </div>
        </Link>
        <div className="e-card__actions">
          { !actionFlag &&
            <div
              onClick={this.bookmarkAction}
              className={"e-card__action e-card__bookmark" + ( isBookmarked ? " is-active" : "" )}>
              <SvgIcon name="bookmark" />
            </div>
          }
          <div
            onClick={this.shareAction}
            className="e-card__action e-card__share">
            <SvgIcon name="share" />
          </div>

          <Dropdown
            extraClass="e-card__action e-card__more">
            <div className="dropdown__menu">
              <li className="dropdown__menu-item">
                <div className="dropdown__menu-icon">
                  <SvgIcon name="dislike" />
                </div>
                <span>Скрыть из новостей</span>
              </li>
              <li className="dropdown__menu-item">
                <div className="dropdown__menu-icon">
                  <SvgIcon name="dislike" />
                </div>
                <span>Пожаловаться</span>
              </li>
            </div>
          </Dropdown>
        </div>
      </div>
    )
  }
}

EventCardTop.propTypes = {
  notify: PropTypes.func,
  openModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
})

const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data)),
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCardTop);
