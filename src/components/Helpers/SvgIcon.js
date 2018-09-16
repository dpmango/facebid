import React from 'react';
import sprite from '../../images/sprite.svg';

const SvgIcon = (props) => {
  const { name } = props;

  if ( name === null ){
    return null
  }

  return(
    <svg
      onClick={props.clickHandler}
      className={"ico ico-" + name}>
      <use xlinkHref={sprite + "#ico-" + name}></use>
    </svg>
  )
}

export default SvgIcon
