import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { closeOnboarding, setOnboardingStep } from 'actions/onboarding';

class Onboarding extends Component{
  constructor(){
    super();

    this.totalSteps = 4
  }

  nextStep = () => {
    if ( this.props.activeStep === this.totalSteps ){
      this.props.closeOnboarding()
    } else {
      this.props.setOnboardingStep(
        this.props.activeStep + 1
      )
    }
  }

  render(){
    const {activeStep} = this.props;

    return(
      <div className="onboarding">
        <div className="container">
          {this.renderStep(activeStep)}
        </div>
      </div>
    )
  }

  renderStep = (step) => {
    switch (step) {
      case 1:
        return <Step1
          nextStep={this.nextStep}/>
      case 2:
        return <Step2
          nextStep={this.nextStep}/>
      case 3:
        return <Step3
          nextStep={this.nextStep}/>
      case 4:
        return <Step4
          nextStep={this.nextStep}/>
      default:
        return null
    }
  }
}

Onboarding.propTypes = {
  closeOnboarding: PropTypes.func,
  setOnboardingStep: PropTypes.func,
  activeStep: PropTypes.number
}

const mapStateToProps = (state) => ({
  activeStep: state.onboarding.onboardingStep
})

const mapDispatchToProps = (dispatch) => ({
  closeOnboarding: () => dispatch(closeOnboarding()),
  setOnboardingStep: (data) => dispatch(setOnboardingStep(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Onboarding);
