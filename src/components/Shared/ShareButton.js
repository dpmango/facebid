import React, {Component, Fragment} from 'react';
import { Helmet } from "react-helmet";
import SvgIcon from '../Helpers/SvgIcon';
import {FacebookShareButton, TwitterShareButton, VKShareButton} from 'react-share';

class ShareButton extends Component{
  constructor(props){
    super(props)

    this.state = {
      isVerified: props.verified
    }

    this.url = window.location.href
  }

  windowClosed = (e) => {
    console.log('window closed', e)
    this.setState({isVerified: true})
  }

  beforeClick = (e) => {
    console.log('before click', e)
  }

  renderContents = () => {
    return (
      <Fragment>
        <SvgIcon name={this.props.provider} />
        { this.state.isVerified &&
          <div className="v-btn__verified">
            <SvgIcon name="checkmark" />
          </div>
        }
      </Fragment>
    )
  }

  render(){

    const {
      props: {provider, shareContents},
      state: {isVerified}
    } = this

    const defaultOptions = {
      onShareWindowClose: this.windowClosed,
      beforeOnClick: this.beforeClick,
      url: this.url,
      className: `v-btn v-btn--${provider}` + (isVerified ? " is-verified" : "")
    }

    if ( provider === "facebook" ){
      return (
        <FacebookShareButton
          {...defaultOptions}
          quote={shareContents.facebook.quote}
          hashtag={shareContents.facebook.hashtag}>
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
          title={shareContents.vkontakte.title}
          description={shareContents.vkontakte.description}
          image={shareContents.vkontakte.image}>
          {this.renderContents()}
        </VKShareButton>
      )
    }
    if ( provider === "twitter" ){
      return (
        <TwitterShareButton
          {...defaultOptions}
          title={shareContents.twitter.title}
          hashtags={shareContents.twitter.hashtags}
          via={shareContents.twitter.via}>
          {this.renderContents()}
        </TwitterShareButton>
      )
    }

    return(
      <div
        onClick={this.windowClosed}
        className={`v-btn v-btn--${provider}` + (isVerified ? " is-verified" : "")}>
        <SvgIcon name={provider} />
        {isVerified &&
          <div className="v-btn__verified">
            <SvgIcon name="checkmark" />
          </div>
        }
      </div>
    )
  }
}

export default ShareButton
