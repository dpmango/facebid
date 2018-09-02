import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import Image from '../Helpers/Image';

class EventCardMedia extends Component {
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

    const { data } = this.props

    return(
      <div className="e-card__media">
        <Swiper {...SwiperParams}>
          {data.map((image, index) => {
            return(
              <div key={index} className="e-card__image">
                <Image file={image} />
              </div>
            )
          })}
        </Swiper>
      </div>
    )
  }
}

export default EventCardMedia
