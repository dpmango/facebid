import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';

class PremiumTabs extends Component{
  render(){
    const { onTabSelected, activeTab } = this.props

    return(
      <div className="premium__tabs">
        <div
          onClick={onTabSelected.bind(this, "vip")}
          className={"premium__tab premium__tab--vip" + (activeTab === "vip" ? " is-active" : "")}>
          <div className="premium__tab-icon">
            <SvgIcon name="crown" />
          </div>
          <div className="premium__tab-name">VIP аккаунт</div>
        </div>

        <div
          onClick={onTabSelected.bind(this, "promote")}
          className={"premium__tab premium__tab--promote" + (activeTab === "promote" ? " is-active" : "")}>
          <div className="premium__tab-icon">
            <SvgIcon name="star-stroke" />
          </div>
          <div className="premium__tab-name">Поднять событие</div>
        </div>
      </div>
    )
  }
}

export default PremiumTabs
