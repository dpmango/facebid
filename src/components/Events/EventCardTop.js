import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import SvgIcon from '../Helpers/SvgIcon';
import Image from '../Helpers/Image';
import { openModal } from '../../actions/modal'

class EventCardTop extends Component {

  constructor(){
    super()

    this.state = {
      isBookmarked: false,
      showMore: false
    }
  }

  bookmarkAction = () => {

    const { isBookmarked } = this.state;
    const { notify } = this.props;

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
    console.log('trigger from EventCardTop')
    this.props.openModal('share-event')
  }

  moreAction = () => {
    this.setState({
      showMore: !this.state.showMore
    })
  }

  render(){
    const {
      props: { id, user },
      state: { isBookmarked }
    } = this;

    return(
      <div className="e-card__top">
        <Link
          to="/profile/2" 
          className="e-card__user">
          <div className="e-card__user-avatar">
            <Image file="userAvatar.jpg" />
          </div>
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
          <div
            onClick={this.bookmarkAction}
            className={"e-card__action e-card__bookmark" + ( isBookmarked ? " is-active" : "" )}>
            <SvgIcon name="bookmark" />
          </div>
          <div
            onClick={this.shareAction}
            className="e-card__action e-card__share">
            <SvgIcon name="share" />
          </div>

          <div
            onClick={this.moreAction}
            className="e-card__action e-card__more">
            <SvgIcon name="more" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data)),
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCardTop);
