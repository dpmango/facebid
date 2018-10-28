import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { notify } from 'reapop';
import api from '../../services/Api';
import Loading from '../Helpers/Loading';
import SvgIcon from '../Helpers/SvgIcon';
import HeadAvatar from './HeadAvatar';
import HeadMetrics from './HeadMetrics';
import HeadInfo from './HeadInfo';
import HeadBottomButtons from './HeadBottomButtons';
import HeadSettingsButtons from './HeadSettingsButtons';
import HeadGallery from './HeadGallery';
import HeadVerifications from './HeadVerifications';
import HeadEdit from './HeadEdit';
import HeadBlacklisted from './HeadBlacklisted';

class Head extends Component{

  constructor(props){
    super(props);

    this.state = {
      editMode: false,
      isLoaded: false,
      avatar: "",
      username: "",
      age: "",
      distance: "",
      fullname: "",
      isVerified: null,
      userLang: "",
      description: "",
      featuredEvent: null,
      subscribers: "",
      subscribed: "",
      gallery: {},
      isBlackListed: null,
      subscribedToUser: false
    }

  }

  componentDidMount(){
    this.getUserData()
  }

  getUserData = () => {
    const {profileId} = this.props;

    api
      .get(`profiles/${profileId}`)
      .then(res => {

        this.setState({
          isLoaded: true,
          avatar: res.data.avatar,
          username: res.data.username,
          age: res.data.age,
          distance: res.data.distance,
          fullname: res.data.fullname,
          isVerified: res.data.isVerified,
          userLang: res.data.userLang,
          description: res.data.description,
          featuredEvent: res.data.featuredEvent,
          subscribers: res.data.subscribers,
          subscribed: res.data.subscribed,
          gallery: res.data.gallery,
          isBlackListed: res.data.isBlackListed

          // subscribedToUser
        })

      })
      .catch(err => {
        console.log('error fetching myProfile')
      })
  }

  saveUserData = (newState) => {
    // newState lifted up when form is saved
    this.setState({
      fullname: newState.fullname,
      userLang: newState.userLang,
      description: newState.description
    }, () => {
      this.disableEdit()
    })
  }

  enableEditMode = () => {
    this.setState({ editMode: true })
  }

  disableEditButtonClick = (e) => {
    e.preventDefault()
    e.stopPropagation();

    this.disableEdit()
  }

  disableEdit = () => {
    this.setState({ editMode: false }, () => {
      this.galleryRef.refreshSliders()
    })
  }


  // GUEST Profile functions

  subscribeToProfile = () => {
    const { notify } = this.props;
    const { username, subscribedToUser } = this.state;

    if ( !subscribedToUser ){
      this.setState({
        subscribedToUser: true
      }, () => {
        notify({
          title: 'Вы подписались',
          message: `Теперь вы будите получать уведомления от ${username}`,
          status: 'default', // default, info, success, warning, error
          dismissible: true,
          dismissAfter: 3000,
        })
      })
    } else {
      this.setState({
        subscribedToUser: false
      }, () => {
        notify({
          title: 'Вы отписались',
          message: `Теперь вы не будите получать уведомления от ${username}`,
          status: 'default', // default, info, success, warning, error
          dismissible: true,
          dismissAfter: 3000,
        })
      })
    }

  }

  // helper render functions
  renderDistance = (di) => {
    return di ? di : "Местоположение неизвестно"
  }


  // Main render function
  render(){
    const {
      state: {
        editMode,
        isLoaded,
        avatar,
        username,
        age,
        distance,
        fullname,
        isVerified,
        userLang,
        description,
        featuredEvent,
        subscribers,
        subscribed,
        gallery,
        isBlackListed,
        subscribedToUser
      },
      props: {
        isMyProfile,
        profileId
      }
    } = this

    return(
      <div className={"p-head" +
        ( !isMyProfile ? " is-guest-profile" : "" ) +
        ( editMode ? " is-in-edit-mode" : "" )}>
        { !isLoaded ?
          <Loading type="user-profile" />
          :
          <Fragment>
            <Helmet>
              <title>Профиль {username}</title>
            </Helmet>
            <div className="p-head__top">
              <div className="p-head__left">
                <HeadAvatar
                  avatar={avatar}
                  eventId={featuredEvent}
                  onAvatarUpdate={(res) => this.setState({avatar: res})}
                  editMode={editMode} />
                { !editMode &&
                  <HeadMetrics
                    subscribers={subscribers}
                    subscribed={subscribed} />
                }
              </div>

              <div className="p-head__right">
                <div className="p-head__name-row">
                  <div className="p-head__name">{username}, {age}</div>
                  { (isVerified && !editMode) &&
                    <div className="p-head__status">
                      <div className="icon-verified">
                        <SvgIcon name="checkmark" />
                      </div>
                    </div>
                  }
                  { editMode &&
                    <HeadVerifications />
                  }
                  { !isMyProfile &&
                    <button
                      disabled={isBlackListed}
                      className={"p-head__top-cta btn "+( subscribedToUser ? " btn-outline" : " btn-primary")+" btn--iconed"}
                      onClick={this.subscribeToProfile}>
                      <SvgIcon name="user" />
                      <span>{!subscribedToUser ? "Подписаться" : "Отписаться"}</span>
                    </button>
                  }
                </div>
                <div className="p-head__profile-link">{isMyProfile ? "Ваш профиль" : this.renderDistance(distance)}</div>
                { !editMode ?
                  <Fragment>
                    <HeadInfo
                      fullname={fullname}
                      userLang={userLang}
                      description={description} />

                    <HeadBottomButtons
                      isBlackListed={isBlackListed}
                      onEnableEditMode={this.enableEditMode}
                      isMyProfile={isMyProfile} />

                    <HeadSettingsButtons
                      profileId={profileId}
                      username={username}
                      isMyProfile={isMyProfile} />
                  </Fragment>
                  :
                  <HeadEdit
                    fullname={fullname}
                    userLang={userLang}
                    description={description}
                    onSave={this.saveUserData}
                    onCancel={this.disableEditButtonClick} />
                }
              </div>
            </div>

            { gallery &&
              <HeadGallery
                onRef={ref => (this.galleryRef = ref)}
                editMode={editMode}
                profileId={profileId}
                isMyProfile={isMyProfile}
                gallery={gallery} />
            }
            { isBlackListed &&
              <HeadBlacklisted
                username={username} />
            }

          </Fragment>
        }
      </div>
    )
  }
}

Head.propTypes = {
  notify: PropTypes.func
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
