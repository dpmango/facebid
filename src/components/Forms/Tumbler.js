import React, {Component} from 'react';
import SvgIcon from '../Helpers/SvgIcon';

class Tumbler extends Component{

  render(){
    const { value } = this.props;

    return(
      <div
        onClick={this.props.clickHandler}
        className={"ui-tumbler" + (value ? " is-active" : "")}>
        <SvgIcon name="checkmark" />
        <SvgIcon name="close" />
      </div>
    )
  }
}

export default Tumbler
