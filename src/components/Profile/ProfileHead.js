import React, { Component, Fragment } from 'react';
import api from '../../services/Api';
import Loading from '../Helpers/Loading';
import Image from '../Helpers/Image'
import SvgIcon from '../Helpers/SvgIcon'
import ProfileHeadGallery from './ProfileHeadGallery'

class ProfileHead extends Component{

  constructor(){
    super();

    this.state = {
      editMode: false,
      isLoaded: false,
      avatar: "",
      username: "",
      age: "",
      fullname: "",
      isVerified: null,
      userLang: "",
      description: "",
      gallery: {}
    }
  }

  componentDidMount(){
    this.getUserData()
  }

  getUserData = () => {
    api
      .get('myProfile')
      .then(res => {

        this.setState({
          isLoaded: true,
          avatar: res.data.avatar,
          username: res.data.username,
          age: res.data.age,
          fullname: res.data.fullname,
          isVerified: res.data.isVerified,
          userLang: res.data.userLang,
          description: res.data.description,
          gallery: res.data.gallery
        })

      })
      .catch(err => {
        console.log('error fetching myProfile')
      })
  }

  saveUserData = () => {

  }

  enableEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  settingsClick = () => {
    // open settings modal page
  }

  render(){

    const {
      state: {
        isLoaded,
        avatar,
        username,
        age,
        fullname,
        isVerified,
        userLang,
        description,
        gallery
      }
    } = this

    return(
      <div className="p-head">
        { !isLoaded ?
          <Loading type="user-profile" />
          :
          <Fragment>
            <div className="p-head__top">
              <div className="p-head__left">
                <div className="p-head__avatar">
                  <div className="p-head__avatar-wrapper">
                    <div className="p-head__avatar-holder">
                      <Image file={avatar} />
                    </div>
                  </div>
                </div>
                <div className="p-head__metrics">
                  <div className="p-head__metric">
                    <div className="p-head__metric-num">14К</div>
                    <div className="p-head__metric-name">Подписчики</div>
                  </div>
                  <div className="p-head__metric">
                    <div className="p-head__metric-num">1,4К</div>
                    <div className="p-head__metric-name">Подписки</div>
                  </div>
                </div>
              </div>

              <div className="p-head__right">
                <div className="p-head__name-row">
                  <div className="p-head__name">{username}, {age}</div>
                  { isVerified &&
                    <div class="p-head__status">
                      <div class="icon-verified">
                        <SvgIcon name="checkmark" />
                      </div>
                    </div>
                  }
                </div>
                <div className="p-head__profile-link">Ваш профиль</div>
                <div className="p-head__row">
                  <div className="p-head__row-title">Имя:</div>
                  <div className="p-head__row-content">{fullname}</div>
                </div>
                <div className="p-head__row">
                  <div className="p-head__row-title">Владею языками:</div>
                  <div className="p-head__row-content">
                    { userLang.map(lang => <UserLang flag={lang.flag} name={lang.name} />)}
                  </div>
                </div>

                <div className="p-head__description">{description}</div>

                <div className="p-head__edit-btn">
                  <button
                    onClick={this.enableEditMode}
                    className="btn btn-primary btn--iconed">
                    <SvgIcon name="pencil" />
                    <span>Редактировать профиль</span>
                  </button>
                </div>

                <div
                  onClick={this.settingsClick}
                  className="p-head__settings-btn btn btn-circle">
                  <SvgIcon name="gear" />
                </div>
              </div>

            </div>

            <ProfileHeadGallery
              gallery={gallery} />

          </Fragment>
        }
      </div>
    )
  }
}

const UserLang = (props) => {
  const { flag, name } = props;
  {/* https://www.iso.org/obp/ui/#search/code/ */}
  return(
    <div className="p-head__country">
      <div className="flag-r50">
        <i className={`flag-icon flag-icon-${flag}`}></i>
      </div>
      <span>{name}</span>
    </div>
  )
}

export default ProfileHead
