import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import SvgIcon from '../Helpers/SvgIcon';
import Image from '../Helpers/Image';
import ConvertMonthNumToName from '../../services/ConvertMonthNumToName';

class EventCard extends Component {
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
        user,
        name,
        from,
        date,
        to,
        desc
      }
    } = this.props

    return(
      <div className="e-card">
        <div className="e-card__wrapper">
          <div className="e-card__media">
            <Swiper {...SwiperParams}>
              {images.map((image, index) => {
                return(
                  <div key={index} className="e-card__image">
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
            <div className="e-card__scrollable">
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

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventCard