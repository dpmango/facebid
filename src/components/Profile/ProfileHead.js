import React, { Component, Fragment } from 'react';
import Formsy from 'formsy-react';
import Select from 'react-select';
import FormInput from '../Forms/Input';
import api from '../../services/Api';
import Loading from '../Helpers/Loading';
import Image from '../Helpers/Image'
import SvgIcon from '../Helpers/SvgIcon'
import HeadMetrics from './HeadMetrics'
import HeadGallery from './HeadGallery'
import MultipleSelectToTotal from '../../helpers/MultipleSelectToTotal';

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
      subscribers: "",
      subscribed: "",
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
      this.submitForm();
    }
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }


  render(){

    const {
      state: {
        editMode,
        isLoaded,
        avatar,
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
                  { isVerified &&
                    <div class="p-head__status">
                      <div class="icon-verified">
                        <SvgIcon name="checkmark" />
                      </div>
                    </div>
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
                        { userLang.map(lang => <UserLang flag={lang.value} name={lang.label} />)}
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
