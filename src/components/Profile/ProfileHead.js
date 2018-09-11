import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import Select from 'react-select';
import FormInput from '../Forms/Input';
import api from '../../services/Api';
import Loading from '../Helpers/Loading';
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import HeadMetrics from './HeadMetrics';
import HeadGallery from './HeadGallery';
import HeadVerifications from './HeadVerifications';
import Settings from '../ProfileSettings/Settings';
import MultipleSelectToTotal from '../../helpers/MultipleSelectToTotal';
import { openModal } from '../../actions/modal';

class ProfileHead extends Component{

  constructor(){
    super();

    this.state = {
      editMode: false,
      isLoaded: false,
      avatar: "",
      isUploadedAvatar: false,
      username: "",
      age: "",
      fullname: "",
      isVerified: null,
      userLang: "",
      description: "",
      subscribers: "",
      subscribed: "",
      gallery: {}
    }

    this.formRef = React.createRef()
    this.uploadRef = React.createRef();

    this.base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

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
          subscribers: res.data.subscribers,
          subscribed: res.data.subscribed,
          gallery: res.data.gallery
        })

      })
      .catch(err => {
        console.log('error fetching myProfile')
      })
  }

  saveUserData = () => {

    this.setState({ editMode: false })
  }

  enableEditMode = () => {
    this.setState({ editMode: true })
  }

  disableEditMode = (e) => {
    e.preventDefault()
    e.stopPropagation();

    this.setState({ editMode: false })
  }

  settingsClick = () => {
    // open settings modal page
    this.props.openModal('settings')
  }


  // FORM (EDITABLE FUNCTIONS)
  formInvalid = () => {
    this.setState({ formIsValid: false });
  }

  formValid = () => {
    this.setState({ formIsValid: true });
  }

  // submit handler from the form
  handleSubmit = (e) => {
    this.setState({isFormSubmitted: true})
    if ( this.state.formIsValid ){
      this.saveUserData();
      this.setState({isFormSubmitted: false}) // reset state here
    }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      // this.submitForm();
    }
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  // avatar uploader
  replaceAvatar = () => {
    this.uploadRef.current.click();

    // ++ API add request
  }

  // when input was actually changed
  handleFileChange = (e) => {
    const input = e.target
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (ev) => {
        this.setState({
          isUploadedAvatar: true,
          avatar: ev.target.result
        })
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  render(){

    const {
      state: {
        editMode,
        isLoaded,
        avatar,
        isUploadedAvatar,
        username,
        age,
        fullname,
        isVerified,
        userLang,
        description,
        subscribers,
        subscribed,
        gallery
      }
    } = this

    return(
      <div className={"p-head" + ( editMode ? " is-in-edit-mode" : "" )}>
        { !isLoaded ?
          <Loading type="user-profile" />
          :
          <Fragment>
            <div className="p-head__top">
              <div className="p-head__left">
                <div className={"p-head__avatar" + (editMode ? " is-editable" : "")}>
                  <div className="p-head__avatar-wrapper">
                    <div className="p-head__avatar-holder">
                      { isUploadedAvatar ?
                        <span style={{
                          backgroundImage: `url(${avatar})`
                        }} />
                        :
                        <Image file={avatar} />
                      }

                      { editMode &&
                        <React.Fragment>
                          <input
                            type="file"
                            ref={this.uploadRef}
                            onChange={this.handleFileChange}
                            style={{ display: 'none' }} />
                          <button
                            onClick={this.replaceAvatar}
                            className="p-head__avatar-btn btn btn-circle btn-circle--white">
                            <SvgIcon name="camera-add" />
                          </button>
                      </React.Fragment>
                      }
                    </div>
                  </div>
                </div>
                {
                  !editMode &&
                  <HeadMetrics
                    subscribers={subscribers}
                    subscribed={subscribed}/>
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
                </div>
                <div className="p-head__profile-link">Ваш профиль</div>
                { !editMode ?
                  <Fragment>
                    <div className="p-head__row">
                      <div className="p-head__row-title">Имя:</div>
                      <div className="p-head__row-content">{fullname}</div>
                    </div>
                    <div className="p-head__row">
                      <div className="p-head__row-title">Владею языками:</div>
                      <div className="p-head__row-content">
                        { userLang.map(lang => <UserLang
                          key={lang.value}
                          flag={lang.value}
                          name={lang.label} />)}
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

                    <Settings />
                  </Fragment>
                  :
                  <Formsy
                    className="p-head__form"
                    onSubmit={this.handleSubmit}
                    onValid={this.formValid}
                    onInvalid={this.formInvalid}
                    ref={this.formRef}
                  >
                    <FormInput
                      name="fullname"
                      type="text"
                      label="Имя:"
                      placeholder="Введите имя"
                      value={fullname}
                      validationErrors={{
                        isDefaultRequiredValue: "Заполните это поле"
                      }}
                      onChangeHandler={this.handleChange}
                      onKeyHandler={this.keyPressHandler}
                      required />
                    <div className="ui-group">
                      <label htmlFor="">Языки:</label>
                      <Select
                        name="userLang"
                        multi={true}
                        removeSelected={false}
                        simpleValue={false}
                        clearable={false}
                        searchable={false}
                        autosize={false}
                        value={userLang}
                        onChange={(e) => this.handleSelectChange(e, "userLang")}
                        placeholder="Выберите языки"
                        valueComponent={MultipleSelectToTotal.bind(this, userLang)}
                        options={[
                          { value: 'ru', label: 'Русский' },
                          { value: 'us', label: 'Английский' },
                          { value: 'ge', label: 'Немецкий' },
                          { value: 'es', label: 'Испанский' },
                          { value: 'fr', label: 'Французкий' }
                        ]}
                      />
                    </div>
                    <FormInput
                      name="description"
                      type="textarea"
                      rows={[5,10]}
                      label="Описание:"
                      placeholder="Введите описание"
                      value={description}
                      validationErrors={{
                        isDefaultRequiredValue: "Заполните это поле"
                      }}
                      onChangeHandler={this.handleChange}
                      onKeyHandler={this.keyPressHandler}
                      required />
                    <div className="p-head__form-cta">
                      <button
                        className="btn btn-primary btn--iconed"
                        type="submit">
                        <SvgIcon name="checkmark" />
                        <span>Сохранить</span>
                      </button>
                      <button
                        onClick={this.disableEditMode}
                        className="btn btn-outline">
                        Отменить
                      </button>
                    </div>
                  </Formsy>
                }
              </div>
            </div>

            <HeadGallery
              editMode={editMode}
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

ProfileHead.propTypes = {
  openModal: PropTypes.func
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHead);
