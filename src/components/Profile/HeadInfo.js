import React, {Component, Fragment} from 'react';
import UserLang from './UserLang';

class HeadInfo extends Component {
  render(){
    const { fullname, description, userLang } = this.props

    return(
      <Fragment>
        <div className="p-head__row">
          <div className="p-head__row-title">Имя:</div>
          <div className="p-head__row-content">{fullname}</div>
        </div>
        <div className="p-head__row">
          <div className="p-head__row-title">Владею языками:</div>
          <div className="p-head__row-content">
            { userLang.map(lang =>
              <UserLang
                key={lang.value}
                flag={lang.value}
                name={lang.label} />)}
          </div>
        </div>
        <div className="p-head__row">
          <div className="p-head__row-title">О себе:</div>
          <div className="p-head__row-content">
            <div className="p-head__description">{description}</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default HeadInfo
