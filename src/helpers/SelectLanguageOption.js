import React from 'react';
import Checkbox from 'components/Forms/Checkbox';

const SelectLanguageOption = (option) => {
  return (
    <div className="Select-country">
      <div className="flag-r50">
        <i className={`flag-icon flag-icon-${option.value}`}></i>
      </div>
      <span>{option.label}</span>
      <Checkbox
        name={option.label}
        text={""} />
    </div>
  );
}


export default SelectLanguageOption
