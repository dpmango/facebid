import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import { Collapse } from 'react-collapse';
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import Thumb from './GalleryThumb'

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

    this.totalSlides = props.gallery.thumbs.length

    this.isPersonal = !props.profileID
    // todo make some other type of detection server-side
  }

  // sliders logic
  // when thumb is clicked
  // allow freemode swiping on change NO slides here
  thumbClick = (index) => {

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

  abuseClicked = () => {

  }

  // close
  closeFull = () => {
    this.setState({
      isGaleryOpen: false,
      currentSlide: null
    })
  }

  fileChanged = (img, index) => {
    console.log(img, index)

    console.log(this.state.gallery)

    // this.setState({
    //   ...this.state,
    // })
  }

  fileRemoved = (index) => {
    console.log('file to be removed', index)
  }

  render(){

    const {
      props: { editMode },
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
      spaceBetween: 17,
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
      slideClass: 'p-head-gal__iamge',
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
        <Swiper
          ref={node => this.swiperThumbs = node ? node.swiper : null }
          {...SwiperParamsThumbs}>
          { gallery.thumbs.map((thumb, index) => {
            return (
              <Thumb
                image={thumb}
                index={index}
                currentSlide={currentSlide}
                editMode={editMode}
                clickHandler={this.thumbClick}
                fileChangeHandler={this.fileChanged}
                fileRemoveHandler={this.fileRemoved}
              />
            )
          }) }
        </Swiper>

        <Collapse
          isOpened={!editMode && isGaleryOpen}>

          <div className="p-head-gal__full-wrapper">
            <Swiper
              ref={node => this.swiperFull = node ? node.swiper : null }
              {...SwiperParamsFull}>
              { gallery.full.map(slide => {
                return (
                  <div className="p-head-gal__image">
                    <Image file={slide} />
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
              <span>{currentSlide + 1}/{this.totalSlides}</span>
            </div>

            { !this.isPersonal &&
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


export default ProfileHeadGallery
