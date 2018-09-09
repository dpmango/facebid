import React from 'react'

import Plurize from '../services/Plurize';

const MultipleSelectToTotal = (items) => {
  const totalHiddenItems = items.length;

  return (
    <div className="Select-value more-than-allowed">
      <span className="Select-value-label" role="option" aria-selected="true">
        {Plurize(totalHiddenItems, "Выбран", "Выбрано", "Выбрано")} {(totalHiddenItems)} {Plurize(totalHiddenItems, "язык", "языка", "языков")}
          <span className="Select-aria-only">&nbsp;</span>
      </span>
    </div>
  );
}

export default MultipleSelectToTotal
