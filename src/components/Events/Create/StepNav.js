import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';

class StepNav extends Component {

  step1Cicked = () => {
    if ( this.props.currentTab === 2){
      // allow "go back" click
      this.props.onStep1Click()
    }
  }
  render(){
    const {currentTab} = this.props;

    return(
      <div className="create-e__steps">
        <div
          onClick={this.step1Cicked}
          className={"create-e__step" +
          (currentTab === 1 ? " is-current" : "") +
          (currentTab === 2 ? " is-compleated" : "")}>
          <div className="create-e__step-wrapper">
            <span>1</span>
            <SvgIcon name="checkmark" />
          </div>
        </div>
        <span className="create-e__steps-separator"></span>
        <div
          className={"create-e__step" +
          (currentTab === 2 ? " is-current" : "")}>
          <div className="create-e__step-wrapper">
            <span>2</span>
          </div>
        </div>
      </div>
    )
  }
}

export default StepNav
