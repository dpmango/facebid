import React, {Component, Fragment} from 'react';
import Formsy from 'formsy-react';
import FormInput from 'components/Forms/Input';
// import SvgIcon from 'components/Helpers/SvgIcon';
import EventCardDate from './EventCardDate';

class EventCardInfo extends Component{
  constructor(props){
    super(props)

    this.state = {
      e_name: props.name,
      e_desc: props.desc,
      formIsValid: null,
      isFormSubmitted: null
    }

    this.formRef = React.createRef()
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  // EDIT FORM FUNCTIONS
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
      // asume that it's a saving actions
      this.props.onSave(this.state);
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
      // this.submitForm();
    }
  }

  render(){
    const {
      props: { name, from, to, location, date, desc, editMode },
      state: { e_name, e_desc }
    } = this

    return(
      <Fragment>
        <div className="e-card__head">
          <div className="e-card__title">{name}</div>
          <div className="e-card__event-line">
            {from &&
              <Fragment>
                <span>{from}</span>
                <i className="icon icon-plane"></i>
              </Fragment>
            }
            { to && <span>{to}</span> }
            { location && <span>{location}</span>}
          </div>
          <EventCardDate
            baseClass="e-card__date"
            date={date} />
        </div>
        { !editMode ?
          <div className="e-card__desc">{desc}</div>
          :
          <Formsy
            className="p-head__form"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef}
          >
            <FormInput
              name="e_name"
              type="text"
              label="Заголовок:"
              placeholder="Введите заголовок"
              value={e_name}
              plugin={{
                name: "symbolLimit",
                config: {
                  maxlength: 38
                }
              }}
              validationErrors={{
                isDefaultRequiredValue: "Заполните это поле"
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required />
            <FormInput
              name="e_desc"
              type="textarea"
              rows={[5,10]}
              label="Описание:"
              placeholder="Введите описание"
              value={e_desc}
              validationErrors={{
                isDefaultRequiredValue: "Заполните это поле"
              }}
              plugin={{
                name: "symbolLimit",
                config: {
                  maxlength: 150
                }
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required />
          </Formsy>
        }

      </Fragment>
    )
  }
}

export default EventCardInfo
