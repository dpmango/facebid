import React, {Component} from 'react';
import {Tooltip} from 'react-tippy';
import SvgIcon from './SvgIcon';

class ToolTip extends Component{
  render(){
    const {content, position} = this.props
    return(
      <Tooltip
        className="tooltip"
        title={content}
        position={position ? position : "top"}
        arrow={true}
        trigger="mouseenter" >
        <SvgIcon name="tooltip-info" />
      </Tooltip>
    )
  }
}

export default ToolTip
