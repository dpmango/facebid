import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Select from 'react-select';
import FormInput from 'components/Forms/Input';
import Toggle from 'components/Forms/Toggle';
import { setCreateEvent } from 'actions/create-event';
import { daySelect, monthSelect, yearSelect } from 'helpers/CalendarSelectArrays';
import MapArrToSelect from 'helpers/MapArrToSelect';

class CreateStep2 extends Component {
  constructor(props){
    super(props);

    this.state = {
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
    this.setState({ [name]: value },
      () => {
        // if ( name === "event_month" || name === "event_year" ){
        //   this.updateDatesOnSelect();
        // }
    })
  }

  // toggle functions
  selectToggle = (val, name) => {
    this.setState({
      [name]: val
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
      category: this.state.category,
      departure: this.state.departure,
      destination: this.state.destination,
      event_day: this.state.event_day,
      event_month: this.state.event_month,
      event_year: this.state.event_year,
      eventType: this.state.eventType,
      numberOfPeople: this.state.numberOfPeople,

      title: this.state.title,
      description: this.state.description,

      privacyComments: this.state.privacyComments,
      privacyDisplayMembers: this.state.privacyDisplayMembers
    })
  }

  render(){
    const {
      state: {
        category, departure, destination,
        event_day, event_month, event_year,
        daySelect, monthSelect, yearSelect,
        eventType, numberOfPeople,
        title, description,
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
          <FormInput
            name="title"
            label="Заголовок:"
            placeholder="Кто со мной в путешествие"
            extraClass="ui-group--row"
            value={title}
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
            extraClass="ui-group--row"
            value={description}
            validationErrors={{
              isDefaultRequiredValue: 'Заполните это поле'
            }}
            onChangeHandler={this.handleChange}
            onKeyHandler={this.keyPressHandler}
            required />

        </div>

        {/* NEXT SECTION - PRIVACY */}
        <div className="create-e__section">
          <div className="create-e__section-name h4-title">Приватность</div>

          <div className="ui-group ui-group--row">
            <label htmlFor="">Комментарии:</label>
            <Toggle
              value={privacyComments}
              name="privacyComments"
              modifierClass="ui-toggle--big"
              options={{
                left: "Включены",
                right: "Выключены"
              }}
              clickHandler={this.selectToggle} />
          </div>
          <div className="ui-group ui-group--row">
            <label htmlFor="">Тип события:</label>
            <Toggle
              value={privacyDisplayMembers}
              name="privacyDisplayMembers"
              modifierClass="ui-toggle--big"
              options={{
                left: "Отображать",
                right: "Скрыть"
              }}
              clickHandler={this.selectToggle} />
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
