import React, {Component} from 'react';

class Toggle extends Component{

  onSelectHandler = (val) => {
    let setVal = val
    // double click should deactive
    if ( this.props.value === val ){ setVal = null }
    this.props.clickHandler(setVal, this.props.name)
  }

  render(){
    const { value, options, modifierClass } = this.props;

    return(
      <div className={`ui-toggle ${modifierClass}`}>
        <div className={"ui-toggle__left" + (value === options.left ? " is-active" : " ")}
          onClick={this.onSelectHandler.bind(this, options.left)}>
          {options.left}</div>
        <div className={"ui-toggle__right" + (value === options.right ? " is-active" : " ")}
          onClick={this.onSelectHandler.bind(this, options.right)}>
          {options.right}</div>
      </div>
    )
  }
}

export default Toggle
