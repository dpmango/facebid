import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';

class EventCardMedia extends Component {
  render(){

    const SwiperParams = {
      // react specific params
      // https://github.com/kidjp85/react-id-swiper
      // containerClass: 'filter-category',
      renderPrevButton: () => <button className="e-card__slider-prev"><SvgIcon name="arrow-left" /></button>,
      renderNextButton: () => <button className="e-card__slider-next"><SvgIcon name="arrow-right" /></button>,

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
      navigation: {
        nextEl: '.e-card__slider-next',
        prevEl: '.e-card__slider-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    }

    const { data } = this.props

    return(
      <div className="e-card__media">
        <Swiper {...SwiperParams}>
          {data.map((image, index) => (
            <div
              key={index}
              className="e-card__image">
              <Image folder="events" file={image} />
            </div>
          ))}
        </Swiper>
      </div>
    )
  }
}

export default EventCardMedia
