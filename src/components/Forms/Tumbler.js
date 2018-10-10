import React, {Component} from 'react';
import SvgIcon from '../Helpers/SvgIcon';

class Tumbler extends Component{

  render(){
    const { value, preText, postText } = this.props;

    return(
      <div
        onClick={this.props.clickHandler}
        className="ui-tumbler-wrapper">
        {preText &&
          <span className="ui-tumbler__text ui-tumbler__text--pre">{preText}</span>
        }
        <div
          className={"ui-tumbler" + (value ? " is-active" : "")}>
          <SvgIcon name="checkmark" />
          <SvgIcon name="close" />
        </div>
        {postText &&
          <span className="ui-tumbler__text ui-tumbler__text--post">{postText}</span>
        }
      </div>
    )
  }
}

export default Tumbler
