import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'
import { withFormsy } from 'formsy-react';
import SvgIcon from '../Helpers/SvgIcon';

class FormInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeHandler: PropTypes.func,
    mask: PropTypes.array
  };

  constructor(props){
    super()

    this.textareaRef = React.createRef()
  }

  changeValue = (event) => {
    this.props.onChangeHandler(event)
    this.props.setValue(event.currentTarget.value);
  }

  render(){
    const { name, id, placeholder, extraClass, mask, label, rows } = this.props

    const type = this.props.type ? this.props.type : "text"

    // An error message is returned only if the component is invalid
    const errorMessage = this.props.isFormSubmitted() ? this.props.getErrorMessage() : null;
    const defaultClass = "ui-group" + (this.props.extraClass ? " " + extraClass : "")
    const parentClass = this.props.isFormSubmitted() ? this.props.isValid() ? defaultClass : `${defaultClass} has-error` : defaultClass

    if ( mask ){
      return (
        <div className={parentClass}>
          <MaskedInput
            type={type}
            mask={mask}
            guide={false}
            name={name}
            placeholder={placeholder}
            onChange={this.changeValue}
            onKeyPress={this.props.onKeyHandler}
            value={this.props.getValue() || ''}
          />
          <span className="ui-validation">{errorMessage}</span>
        </div>
      )
    } else {
      return(
        <div className={parentClass}>
          {label &&
            <label htmlFor={name}>{label}</label>
          }
          <div className="ui-input">
            { type !== "textarea" &&
              <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={this.changeValue}
                onKeyPress={this.props.onKeyHandler}
                value={this.props.getValue() || ''}
                // required={isRequired ? true : false}
              />
            }
            { type === "textarea" &&
              <textarea
                type={type}
                rows={rows}
                ref={this.textareaRef}
                name={name}
                placeholder={placeholder}
                onChange={this.changeValue}
                onKeyPress={this.props.onKeyHandler}
                value={this.props.getValue() || ''}
                // required={isRequired ? true : false}
              />
            }
          </div>
          <span className="ui-validation">{errorMessage}</span>
        </div>
      )
    }

  }
}

export default withFormsy(FormInput);
