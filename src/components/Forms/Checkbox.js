import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SvgIcon from '../components/SvgIcon';

class Checkbox extends Component {
  render(){

    const {
      name,
      value,
      clickHandler,
      text
    } = this.props

    return(
      <div className={value ? "ui-checkbox is-active" : "ui-checkbox"} onClick={clickHandler}>
        <input type="checkbox" name={name} id={name} />
        <div className={"ui-checkbox__label" + ( !text ? " ui-checkbox__label--no-text" : "" )}>
          { text &&
            <span>{text}</span>
          }
        </div>
      </div>
    )
  }
}

Checkbox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  clickHandler: PropTypes.func,
  active: PropTypes.bool
}

export default Checkbox
