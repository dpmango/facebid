import React, {Component} from 'react';
import Formsy from 'formsy-react';
import Select from 'react-select';
import FormInput from '../Forms/Input';
import SvgIcon from '../Helpers/SvgIcon';
import MultipleSelectToTotal from '../../helpers/MultipleSelectToTotal';

class HeadEdit extends Component {
  constructor(props){
    super(props)

    this.state = {
      fullname: props.fullname,
      userLang: props.userLang,
      description: props.description
    }

    this.formRef = React.createRef()
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

  render(){

    const {
      state: {fullname, userLang, description}
    } = this;

    return(
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
            onClick={this.onCancel}
            className="btn btn-outline">
            Отменить
          </button>
        </div>
      </Formsy>
    )
  }
}

export default HeadEdit
