import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SvgIcon from '../components/SvgIcon';

class Radio extends Component {
  render(){

    const {
      name,
      value,
      clickHandler,
      text
    } = this.props

    return(
      <div className={"ui-radio" + (value === text ? " is-active" : "")} onClick={clickHandler.bind(this, text, name)}>
        <input type="radio" name={name} id={name} />
        <div className={"ui-radio__label" + ( !text ? " ui-radio__label--no-text" : "" )}>
          { text &&
            <span>{text}</span>
          }
        </div>
      </div>
    )
  }
}

Radio.propTypes = {
  name: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  clickHandler: PropTypes.func,
  active: PropTypes.bool
}

export default Radio
