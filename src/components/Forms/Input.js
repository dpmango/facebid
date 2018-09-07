import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Textarea from 'react-textarea-autosize';
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

    this.state = {
      isFocused: false
    }

    this.textareaRef = React.createRef()
  }

  changeValue = (e) => {
    console.log(e)
    this.props.onChangeHandler(e)
    this.props.setValue(e.currentTarget.value);
  }

  onFocusHandler = () => {
    this.setState({ isFocused: true })
  }

  onBlurHandler = () => {
    this.setState({ isFocused: false })
  }

  render(){
    const { name, id, placeholder, extraClass, icon, mask, label, rows } = this.props

    const type = this.props.type ? this.props.type : "text"

    // An error message is returned only if the component is invalid
    const errorMessage = this.props.isFormSubmitted() ? this.props.getErrorMessage() : null;
    const defaultClass = "ui-group" + ( this.state.isFocused ? " is-focused" : "" ) + (this.props.extraClass ? " " + extraClass : "")
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
          <div className={"ui-input" + (icon ? "ui-input--iconed" : "") }>
            { type !== "textarea" &&
              <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={this.changeValue}
                onBlur={this.onBlurHandler}
                onFocus={this.onFocusHandler}
                onKeyPress={this.props.onKeyHandler}
                value={this.props.getValue() || ''}
                // required={isRequired ? true : false}
              />
            }
            { type === "textarea" &&
              <Textarea
                // useCacheForDOMMeasurements
                ref={this.textareaRef}
                minRows={rows[0] || 5}
                maxRows={rows[1] || 10}
                name={name}
                placeholder={placeholder}
                onChange={this.changeValue}
                onBlur={this.onBlurHandler}
                onFocus={this.onFocusHandler}
                onKeyPress={this.props.onKeyHandler}
                // onHeightChange={(height, instance) => console.log(height, instance.rowCount)}
                value={this.props.getValue() || ''}
              />
              //<textarea
              //  type={type}
              //  rows={rows}
              //  ref={this.textareaRef}
              //  name={name}
              //  placeholder={placeholder}
              //  onChange={this.changeValue}
              //  onBlur={this.onBlurHandler}
              //  onFocus={this.onFocusHandler}
              //  onKeyPress={this.props.onKeyHandler}
              //  value={this.props.getValue() || ''}
                // required={isRequired ? true : false}
              // />
            }
            { icon &&
              <SvgIcon name={icon} />
            }
          </div>
          <span className="ui-validation">{errorMessage}</span>
        </div>
      )
    }

  }
}

export default withFormsy(FormInput);
