import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';

class HeadBlacklisted extends Component{
  render(){
    const { username } = this.props;
    // TODO - gender

    return(
      <div className="p-head__blacklisted">
        <SvgIcon name="eye-disabled" />
        <span>{username} добавила Вас  <br/> в черный список</span>
      </div>
    )
  }
}

export default HeadBlacklisted
