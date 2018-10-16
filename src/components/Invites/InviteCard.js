import React, {Component} from 'react';
import {connect} from 'react-redux';
import Swiper from 'react-id-swiper';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';
import {openModal} from 'actions/modal';

class InviteCard extends Component{
  // open event modal
  openInvite = (eventId, userId) => {
    this.props.openModal({
      name: "invite",
      options: {
        eventId: eventId,
        userId: userId
      }
    })
  }

  render(){
    const SwiperParams = {
      renderPrevButton: () => <button className="i-card__slider-prev"><SvgIcon name="arrow-left" /></button>,
      renderNextButton: () => <button className="i-card__slider-next"><SvgIcon name="arrow-right" /></button>,
      containerClass: 'swiper-container i-card__slider',
      slideClass: 'i-card__image',
      direction: 'horizontal',
      watchOverflow: true,
      loop: true,
      setWrapperSize: false,
      spaceBetween: 0,
      slidesPerView: 1,
      normalizeSlideIndex: true,
      freeMode: false,
      navigation: {
        nextEl: '.i-card__slider-next',
        prevEl: '.i-card__slider-prev',
      },
    }

    const {
      props: {id, images, user}
    } = this

    return(
      <div className="i-card">
        <Swiper {...SwiperParams}>
          {images.map(img => (
            <div
              key={img.id}
              className="i-card__image">
              <Image file={img.url} />
            </div>
          ))}
        </Swiper>
        <div className="i-card__contents">
          <div className="i-card__user">
            <div className="i-card__user-name">{user.name}, {user.age}</div>
            <div className="i-card__user-distance">{user.distance}</div>
          </div>
          <div className="i-card__cta">
            <button
              className="btn btn-primary btn--iconed"
              onClick={this.openInvite.bind(this, id, user.id)}>
              <SvgIcon name="profile-add" />
              <span>Пригласить</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(null, mapDispatchToProps)(InviteCard);
