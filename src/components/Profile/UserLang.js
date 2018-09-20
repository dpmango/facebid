import React from 'react';

const UserLang = (props) => {
  const { flag, name } = props;
  return(
    <div className="p-head__country">
      {/* https://www.iso.org/obp/ui/#search/code/ */}
      <div className="flag-r50">
        <i className={`flag-icon flag-icon-${flag}`}></i>
      </div>
      <span>{name}</span>
    </div>
  )
}

export default UserLang
