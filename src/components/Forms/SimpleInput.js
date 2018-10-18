import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../Helpers/SvgIcon';

class SimpleInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeHandler: PropTypes.func,
  };

  constructor(props){
    super()

    this.state = {
      isFocused: false
    }

  }

  changeValue = (e) => {
    this.props.onChangeHandler(e)
  }

  onFocusHandler = () => {
    this.setState({ isFocused: true })
  }

  onBlurHandler = () => {
    const {keepFocus, value} = this.props;

    if ( keepFocus && value.length >= 2){
      return false
    }
    this.setState({ isFocused: false })
  }

  render(){
    const {
      props: { name, id, value, extraClass, placeholder, icon, isClearable },
      state: { isFocused }
    } = this

    const type = this.props.type ? this.props.type : "text"
    const classBuilder = "ui-input" + (extraClass ? ` ${extraClass}` : "") + (icon ? " ui-input--iconed" : "") + ( isFocused ? " is-focused" : "" )

    return(
      <div className={classBuilder}>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={this.changeValue}
          onBlur={this.onBlurHandler}
          onFocus={this.onFocusHandler}
          onKeyPress={this.props.onKeyHandler}
          value={value} />
        { icon && <SvgIcon clickHandler={this.props.iconClickHandler} name={icon} /> }
      </div>
    )

  }
}

export default SimpleInput;
