import React, {Component} from 'react';
import UserLang from './UserLang';

class HeadInfo extends Component {
  render(){
    const { fullname, description, userLang } = this.props

    return(
      <React.Fragment>
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

        <div className="p-head__description">{description}</div>
      </React.Fragment>
    )
  }
}

export default HeadInfo
