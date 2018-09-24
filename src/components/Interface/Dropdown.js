import React, {Component} from 'react';
import ClickOutside from 'react-click-outside';
import SvgIcon from 'components/Helpers/SvgIcon';

class Dropdown extends Component{
  constructor(){
    super();

    this.state = {
      opened: false
    }
  }

  clickHandler = () => {
    if ( this.props.clickHandler )
      this.props.clickHandler

    this.setState({
      opened: !this.state.opened
    })
  }

  hide = () => {
    this.setState({opened: false})
  }

  // so link click don't close the dropdown
  preventClickAbove = (e) => {
    e.stopPropagation()
  }

  render(){
    const {
      state: { opened },
      props: { extraClass }
    } = this

    return(
      <ClickOutside
        onClick={this.clickHandler}
        onClickOutside={this.hide}
        className={(extraClass ? extraClass : "") + " dropdown" + (opened ? " is-active" : "")}>
        <SvgIcon
          name="more" />

        <div
          onClick={this.preventClickAbove}
          className="dropdown__hidden">
          {this.props.children}
        </div>
      </ClickOutside>
    )
  }
}

export default Dropdown
