import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Collapse } from 'react-collapse';
import SvgIcon from '../Helpers/SvgIcon';
import Thumb from './GalleryThumb'
import AddImage from './AddImage';
import RenderImage from 'helpers/RenderImage'

class ProfileHeadGallery extends Component{

  constructor(props){
    super(props)

    this.state = {
      isGaleryOpen: false,
      currentSlide: null,
      gallery: props.gallery
    }

    this.swiperThumbs = null
    this.swiperFull = null

  }

  componentDidMount(){
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  // sliders logic
  // when thumb is clicked
  // allow freemode swiping on change NO slides here
  thumbClick = (index) => {

    if ( this.props.editMode ){
      return false
    }

    if ( !this.state.isGaleryOpen ){
      this.setState({
        isGaleryOpen: true
      })
    }

    this.setState({
      currentSlide: index
    }, () => this.syncSwipers('thumb') )
  }

  // when full slider has changed - sync thumbs trigger
  fullSliderChanged = () => {
    const curIndex = this.swiperFull.activeIndex

    this.setState({
      currentSlide: curIndex
    }, () => this.syncSwipers('full'))
  }

  // controller magic
  syncSwipers = (from) => {
    const { currentSlide } = this.state;

    if ( from === 'thumb' ){
      if (this.swiperFull) {
        this.swiperFull.slideTo(currentSlide);
      }
    } else if ( from === 'full' ){
      if (this.swiperThumbs) {
        this.swiperThumbs.slideTo(currentSlide);
      }
    }
  }

  refreshSliders = () => {
    // when slides change because of add/remove in edit mode
    this.swiperThumbs.update() // updateSlides submethod of .update()
    this.swiperFull.update() // updateSlides submethod of .update()
  }


  abuseClicked = () => {
    // open modal with abuse
  }

  // close
  closeFull = () => {
    this.setState({
      isGaleryOpen: false,
      currentSlide: null
    })
  }

  imageAdded = (img, index) => {
    this.setState({
      ...this.state,
      gallery: {
        thumbs: [...this.state.gallery.thumbs, img],
        full: [...this.state.gallery.full, img]
      }
    })

    // TODO - + API call
  }

  fileRemoved = (index) => {

    this.setState({
      ...this.state,
      gallery: {
        thumbs: this.state.gallery.thumbs.filter((x, i) => i !== index ),
        full: this.state.gallery.full.filter((x, i) => i !== index)
      }
    })

    // TODO - + API call
  }

  // sorting functions
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      ...this.state,
      gallery: {
        thumbs: arrayMove(this.state.gallery.thumbs, oldIndex, newIndex),
        full: arrayMove(this.state.gallery.full, oldIndex, newIndex),
      }
    });
  }

  render(){

    const {
      props: { editMode, isMyProfile },
      state: { gallery, isGaleryOpen, currentSlide }
    } = this

    const SwiperParamsThumbs = {
      // react specific params
      // https://github.com/kidjp85/react-id-swiper
      containerClass: 'p-head-gal__thumbs swiper-container',
      slideClass: 'p-head-gal__thumb',
      renderPrevButton: () => <button className="p-head-gal__thumbs-prev"><SvgIcon name="arrow-left" /></button>,
      renderNextButton: () => <button className="p-head-gal__thumbs-next"><SvgIcon name="arrow-right" /></button>,

      // common swiper API
      // http://idangero.us/swiper/api/
      watchOverflow: true,
      setWrapperSize: false,
      spaceBetween: 10,
      slidesPerView: 'auto',
      normalizeSlideIndex: true,
      freeMode: true,
      navigation: {
        nextEl: '.p-head-gal__thumbs-next',
        prevEl: '.p-head-gal__thumbs-prev',
      },
      slidesOffsetBefore: 24,
      slidesOffsetAfter: 24
    }

    const SwiperParamsFull = {
      // react specific params
      // https://github.com/kidjp85/react-id-swiper
      containerClass: 'p-head-gal__full swiper-container',
      slideClass: 'p-head-gal__image',
      renderPrevButton: () => <button className="p-head-gal__full-prev"><SvgIcon name="arrow-left" /></button>,
      renderNextButton: () => <button className="p-head-gal__full-next"><SvgIcon name="arrow-right" /></button>,

      // common swiper API
      // http://idangero.us/swiper/api/
      watchOverflow: true,
      setWrapperSize: false,
      spaceBetween: 0,
      slidesPerView: 1,
      normalizeSlideIndex: true,
      freeMode: false,
      navigation: {
        nextEl: '.p-head-gal__full-next',
        prevEl: '.p-head-gal__full-prev',
      },
      on: {
        slideChange: () => {
          this.fullSliderChanged()
        }
      }
    }

    return(
      <div className="p-head-gal">
        { !editMode ?
          <Swiper
            ref={node => this.swiperThumbs = node ? node.swiper : null }
            {...SwiperParamsThumbs}>
            { gallery.thumbs.map((thumb, index) => (
              <Thumb
                key={index}
                image={thumb}
                index={index}
                currentSlide={currentSlide}
                editMode={editMode}
                clickHandler={this.thumbClick}
                fileRemoveHandler={this.fileRemoved} />
            ))}
          </Swiper>
          :
          <SortableList
            axis="xy"
            clickHandler={this.thumbClick}
            fileRemoveHandler={this.fileRemoved}
            items={gallery.thumbs}
            onSortEnd={this.onSortEnd}
            // add file options
            fileChangeHandler={this.imageAdded}
          />
        }

        <Collapse
          isOpened={!editMode && isGaleryOpen}>

          <div className="p-head-gal__full-wrapper">
            <Swiper
              ref={node => this.swiperFull = node ? node.swiper : null }
              {...SwiperParamsFull}>
              { gallery.full.map((slide, index) => {
                return (
                  <div
                    key={index}
                    className="p-head-gal__image">
                    <div className="p-head-gal__image-blur">{RenderImage(slide, "gallery")}</div>
                    <div className="p-head-gal__image-main">{RenderImage(slide, "gallery")}</div>
                  </div>
                )
              }) }
            </Swiper>
            <div
              onClick={this.closeFull}
              className="p-head-gal__close-full">
              <SvgIcon name="close" />
            </div>
            <div className="p-head-gal__counter">
              <SvgIcon name="camera" />
              <span>{currentSlide + 1}/{gallery.full.length}</span>
            </div>

            { !isMyProfile &&
              <div
                onClick={this.abuseClicked}
                className="p-head-gal__abuse btn btn-circle btn-circle--black50">
                <SvgIcon name="flag" />
              </div>
            }
          </div>
        </Collapse>
      </div>
    )
  }
}

const SortableItem = SortableElement(({value, elIndex, fileRemoveHandler}) => (
  <Thumb
    image={value}
    index={elIndex}
    editMode={true}
    fileRemoveHandler={fileRemoveHandler} />
));

const SortableList = SortableContainer(({items, fileRemoveHandler, clickHandler, fileChangeHandler}) => {
  return (
    <div className="p-head-gal__thumbs-editable">
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          elIndex={index}
          fileRemoveHandler={fileRemoveHandler}
          value={value} />
      ))}
      <AddImage
        clickHandler={clickHandler}
        fileChangeHandler={fileChangeHandler} />
    </div>
  )
});

export default ProfileHeadGallery
