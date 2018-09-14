import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import { Collapse } from 'react-collapse';
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import Thumb from './GalleryThumb'
import AddImage from './AddImage';
import RenderImage from '../../helpers/RenderImage'

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

    this.isPersonal = !props.profileID
    // todo make some other type of detection server-side
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

    console.log('refresh')
    
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
                key={index}
                image={thumb}
                index={index}
                currentSlide={currentSlide}
                editMode={editMode}
                clickHandler={this.thumbClick}
                fileRemoveHandler={this.fileRemoved}
              />
            )
          }) }
          { editMode &&
            <AddImage
              clickHandler={this.thumbClick}
              fileChangeHandler={this.imageAdded} />
          }
        </Swiper>

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
                    {RenderImage(slide)}
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
