import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import SvgIcon from '../../components/Helpers/SvgIcon';

class FilterSlider extends Component {
  constructor(){
    super()

    this.state = {
      selectedCategories: []
    }
  }

  render(){
    const SwiperParams = {
      // react specific params
      // https://github.com/kidjp85/react-id-swiper
      // containerClass: 'filter-category',
      slideClass: 'filter-category',
      // shouldSwiperUpdate: true,
      // rebuildOnUpdate: true,
      renderPrevButton: () => <button className="filters__slider-prev"><SvgIcon name="arrow-left" /></button>,
      renderNextButton: () => <button className="filters__slider-next"><SvgIcon name="arrow-right" /></button>,

      // common swiper API
      // http://idangero.us/swiper/api/

      direction: 'horizontal',
      watchOverflow: true,
      setWrapperSize: false,
      spaceBetween: 10,
      slidesPerView: 'auto',
      normalizeSlideIndex: true,
      freeMode: true,
      navigation: {
        nextEl: '.filters__slider-next',
        prevEl: '.filters__slider-prev',
      },
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20
    }

    const slides = [
      {icon: "filter-category-1", name: "Все"},
      {icon: "filter-category-2", name: "Подписчики"},
      {icon: "filter-category-3", name: "путешествия"},
      {icon: "filter-category-4", name: "В кино"},
      {icon: "filter-category-5", name: "Свидание"},
      {icon: "filter-category-6", name: "Спорт"},
      {icon: "filter-category-7", name: "Языковой обмен"},
      {icon: "filter-category-8", name: "Все"},
      {icon: "filter-category-9", name: "Все"},
      {icon: "filter-category-10", name: "Все"},
      {icon: "filter-category-11", name: "Все"},
      {icon: "filter-category-12", name: "Все"},
      {icon: "filter-category-13", name: "Все"},
      {icon: "filter-category-14", name: "Все"},
      {icon: "filter-category-15", name: "Все"}
    ]

    return(
      <div className="filters__slider">
        <Swiper {...SwiperParams}>
          { slides.map((slide,index) => {
            return <FilterCategory key={index} icon={slide.icon} name={slide.name} />
          }) }
        </Swiper>
      </div>
    )
  }
}

const FilterCategory = (props) => {
  const { icon, name } = props
  return(
    <div className="filter-category">
      <div className="filter-category__icon">
        <SvgIcon name={icon} />
      </div>
      <div className="filter-category__name">{name}</div>
    </div>
  )
}

export default FilterSlider
