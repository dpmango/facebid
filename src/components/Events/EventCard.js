import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import SvgIcon from '../Helpers/SvgIcon';
import Image from '../Helpers/Image';

class EventCard extends Component {
  render(){
    const SwiperParams = {
      // react specific params
      // https://github.com/kidjp85/react-id-swiper
      // containerClass: 'filter-category',
      containerClass: 'swiper-container e-card__slider',
      slideClass: 'e-card__image',
      // common swiper API
      // http://idangero.us/swiper/api/
      direction: 'horizontal',
      watchOverflow: true,
      setWrapperSize: false,
      spaceBetween: 0,
      slidesPerView: 1,
      normalizeSlideIndex: true,
      freeMode: false,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    }

    const {
      data: {
        images,
        user
      }
    } = this.props

    return(
      <div className="e-card">
        <div className="e-card__wrapper">
          <div className="e-card__media">
            <Swiper {...SwiperParams}>
              {images.map(image => {
                return(
                  <div className="e-card__image">
                    <Image file={image} />
                  </div>
                )
              })}
            </Swiper>
          </div>
          <div className="e-card__contents">
            <div className="e-card__top">
              <div className="e-card__user">
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
              </div>
              <div className="e-card__actions">
                <div className="e-card__action e-card__bookmark">
                  <SvgIcon name="bookmark" />
                </div>
                <div className="e-card__action e-card__share">
                  <SvgIcon name="share" />
                </div>
                <div className="e-card__action e-card__more">
                  <SvgIcon name="more" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventCard
