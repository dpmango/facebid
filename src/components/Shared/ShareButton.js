import React, {Component, Fragment} from 'react';
import { Helmet } from "react-helmet";
import SvgIcon from '../Helpers/SvgIcon';
import {
  FacebookShareButton,
  TwitterShareButton,
  VKShareButton,
  GooglePlusShareButton,
  OKShareButton
} from 'react-share';

class ShareButton extends Component{
  constructor(props){
    super(props)

    this.state = {
      isVerified: props.verified,
      url: props.url || window.location.href
    }

  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.url && (nextProps.url !== prevState.url)) {
      return { url: nextProps.url};
    } else {
      return null;
    }
  }

  windowClosed = (e) => {
    console.log('window closed', e)
    this.setState({isVerified: true})
  }

  beforeClick = (e) => {
    console.log('before click', e)
  }

  renderContents = () => {
    const {
      props: {provider, verbose, type},
      state: { isVerified }
    } = this

    if ( type === "withName" ){
      return(
        <Fragment>
          <div className="share__icon">
            <SvgIcon name={provider} />
          </div>
          <div className="share__name">
            {verbose}
          </div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <SvgIcon name={provider} />
        { isVerified &&
          <div className="v-btn__verified">
            <SvgIcon name="checkmark" />
          </div>
        }
      </Fragment>
    )
  }

  render(){
    const {
      props: {type, provider, shareContents},
      state: {isVerified, url}
    } = this

    const className = type === "withName" ?
    `share__element share__element--${provider}` :
    `v-btn v-btn--${provider}` + (isVerified ? " is-verified" : "")

    const defaultOptions = {
      onShareWindowClose: this.windowClosed,
      beforeOnClick: this.beforeClick,
      url: url,
      className: className
    }

    if ( provider === "facebook" ){
      return (
        <FacebookShareButton
          {...defaultOptions}
          quote={shareContents && shareContents.facebook.quote}
          hashtag={shareContents && shareContents.facebook.hashtag}>
          {this.renderContents()}
          <Helmet>
            <meta property="og:image" content="image_url" />
          </Helmet>
        </FacebookShareButton>
      )
    }
    if ( provider === "vkontakte" ){
      return (
        <VKShareButton
          {...defaultOptions}
          title={shareContents && shareContents.vkontakte.title}
          description={shareContents && shareContents.vkontakte.description}
          image={shareContents && shareContents.vkontakte.image}>
          {this.renderContents()}
        </VKShareButton>
      )
    }
    if ( provider === "twitter" ){
      return (
        <TwitterShareButton
          {...defaultOptions}
          title={shareContents && shareContents.twitter.title}
          hashtags={shareContents && shareContents.twitter.hashtags}
          via={shareContents && shareContents.twitter.via}>
          {this.renderContents()}
        </TwitterShareButton>
      )
    }
    if ( provider === "odnoklassniki" ){
      return (
        <OKShareButton
          {...defaultOptions}
          title={shareContents && shareContents.vkontakte.title}
          description={shareContents && shareContents.vkontakte.description}
          image={shareContents && shareContents.vkontakte.image}>
          {this.renderContents()}
        </OKShareButton>
      )
    }
    if ( provider === "gplus" ){
      return (
        <GooglePlusShareButton {...defaultOptions}>
          {this.renderContents()}
        </GooglePlusShareButton>
      )
    }

    return null // defaut case
  }
}

export default ShareButton
