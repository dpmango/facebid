import React from 'react';
import sprite from '../../images/sprite.svg';

const SvgIcon = (props) => {
  const { name } = props;
  return(
    <svg className={"ico ico-" + name}>
      <use xlinkHref={sprite + "#ico-" + name}></use>
    </svg>
  )
}

export default SvgIcon
