import React from 'react';
import sprite from '../images/sprite.svg';

const SvgIcon = (props) => {
  render(){
    const { name } = this.props;
    return(
      <svg className={"ico ico-" + name}>
        <use xlinkHref={sprite + "#ico-" + name}></use>
      </svg>
    )
  }
}
