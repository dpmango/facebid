import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import SvgIcon from '../Helpers/SvgIcon';

class CategoriesSlider extends Component {
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

    let slides = [
      {id: 1, icon: "filter-category-all", name: "Все"},
      {id: 3, icon: "filter-category-travel", name: "Путешествия"},
      {id: 7, icon: "filter-category-lang", name: "Языковой обмен"},
      {id: 4, icon: "filter-category-movie", name: "В кино"},
      {id: 5, icon: "filter-category-dating", name: "Свидание"},
      {id: 8, icon: "filter-category-culture", name: "Культура"},
      {id: 11, icon: "filter-category-food", name: "Перекусим"},
      {id: 12, icon: "filter-category-childs", name: "Дети"},
      {id: 10, icon: "filter-category-entertainment", name: "Развлечения"},
      {id: 9, icon: "filter-category-hobby", name: "Хобби"},
      {id: 17, icon: "filter-category-events", name: "Мероприятия"},
      {id: 6, icon: "filter-category-fitness", name: "Фитнес"},
      {id: 15, icon: "filter-category-activelife", name: "Активный отдых"},
      {id: 14, icon: "filter-category-education", name: "Образование"},
      {id: 2, icon: "filter-category-volonter", name: "Волонтерство"},

      // {id: 13, icon: "filter-category-nightlife", name: "Ночная жизнь"},
      // {id: 16, icon: "filter-category-couchserfing", name: "Каучсерфинг"}
    ]
    if ( this.props.type === "create-event" ){
      slides = slides.filter(x => x.name !== "Все" )
    }

    return(
      <div className="filters__slider">
        <Swiper {...SwiperParams}>
          { slides.map(slide => (
            <FilterCategory
              key={slide.id}
              values={this.props.values}
              clickHandler={this.props.clickHandler}
              id={slide.id}
              icon={slide.icon}
              name={slide.name} />
          ))}
        </Swiper>
      </div>
    )
  }
}

const FilterCategory = (props) => {
  const { icon, name, id, values } = props
  return(
    <div
      onClick={props.clickHandler.bind(this, id)}
      className={"filter-category" + (values.indexOf(id) !== -1 ? " is-active" : "")}>
      <div className="filter-category__icon">
        <SvgIcon name={icon} />
        <div className="filter-category__selected">
          <span className="ico-blue-circle">
            <SvgIcon name="checkmark" />
          </span>
        </div>
      </div>
      <div className="filter-category__name">{name}</div>
    </div>
  )
}

export default CategoriesSlider
