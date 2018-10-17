import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Select from 'react-select';
import FormInput from 'components/Forms/Input';
import Tumbler from 'components/Forms/Tumbler';
import CreateUploader from './CreateUploader';
import { setCreateEvent } from 'actions/create-event';
import { daySelect, monthSelect, yearSelect } from 'helpers/CalendarSelectArrays';
import MapArrToSelect from 'helpers/MapArrToSelect';

class CreateStep2 extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: props.createEventRedux.images,
      title: props.createEventRedux.title,
      description: props.createEventRedux.description,

      privacyComments: props.createEventRedux.privacyComments,
      privacyDisplayMembers: props.createEventRedux.privacyDisplayMembers
    }

    this.formRef = React.createRef();
  }


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
      this.processNext();
      this.setState({isFormSubmitted: false}) // reset state here
    }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fieldVal});
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      this.submitForm();
    }
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value },
      () => {
        // if ( name === "event_month" || name === "event_year" ){
        //   this.updateDatesOnSelect();
        // }
    })
  }

  // toggle functions
  selectToggle = (name) => {
    this.setState({
      [name]: !this.state[name]
    })
  }

  // auth passed to redux
  processNext = () => {
    this.saveState();
    // this.props.openModal('create-event-2')
  }

  saveState = () => {
    this.props.setCreateEvent({
      ...this.props.createEventRedux,
      images: this.state.images,
      title: this.state.title,
      description: this.state.description,

      privacyComments: this.state.privacyComments,
      privacyDisplayMembers: this.state.privacyDisplayMembers
    })
  }

  changeImages = () => {
    // todo
  }

  render(){
    const {
      state: {
        images, title, description,
        privacyComments, privacyDisplayMembers
      },
      props: {

      }
    } = this
    return(
      <Formsy
        className="create-e"
        onSubmit={this.handleSubmit}
        onValid={this.formValid}
        onInvalid={this.formInvalid}
        ref={this.formRef} >

        {/* NEXT SECTION */}
        <div className="create-e__section">
          <div className="create-e__section-name h4-title">Основная информация</div>
          <div className="create-e__row">
            <div className="create-e__col">
              <CreateUploader
                onChangeImages={this.changeImages}
                images={images} />
            </div>
            <div className="create-e__col">
              <div className="ui-groups-margin">
                <FormInput
                  name="title"
                  label="Заголовок:"
                  placeholder="Кто со мной в путешествие"
                  value={title}
                  plugin={{
                    name: "symbolLimit",
                    config: {
                      maxlength: 38
                    }
                  }}
                  validationErrors={{
                    isDefaultRequiredValue: 'Заполните это поле'
                  }}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler}
                  required />
                <FormInput
                  name="description"
                  type="textarea"
                  rows={[5, 10]}
                  label="Описание:"
                  placeholder="В июне состоится масштабное мероприятие одного из самых известных российских современных художников. Собираю группу из 20 человек. Сначала на выставку, потом гулять до утра."
                  value={description}
                  plugin={{
                    name: "symbolLimit",
                    config: {
                      maxlength: 150
                    }
                  }}
                  validationErrors={{
                    isDefaultRequiredValue: 'Заполните это поле'
                  }}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler}
                  required />
              </div>
            </div>
          </div>
        </div>

        {/* NEXT SECTION - PRIVACY */}
        <div className="create-e__section">
          <div className="create-e__section-name h4-title">Приватность</div>
          <div className="nt">
            <div className="nt__grid">
              <div className="nt__col">
                <div className="ui-toggle-row">
                  <label htmlFor="">Комментарии:</label>
                  <Tumbler
                    value={privacyComments}
                    clickHandler={this.selectToggle.bind(this, "privacyComments")} />
                </div>
              </div>
              <div className="nt__col">
                <div className="ui-toggle-row">
                  <label htmlFor="">Отображать участников:</label>
                  <Tumbler
                    value={privacyDisplayMembers}
                    clickHandler={this.selectToggle.bind(this, "privacyDisplayMembers")} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </Formsy>
    )
  }

}


CreateStep2.propTypes = {
  setCreateEvent: PropTypes.func
}

const mapStateToProps = (state) => ({
  createEventRedux: state.createEvent
});

const mapDispatchToProps = (dispatch) => ({
  setCreateEvent: (data) => dispatch(setCreateEvent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStep2);
