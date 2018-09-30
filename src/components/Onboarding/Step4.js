import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Geolocation from 'react-geolocation';
import Image from 'components/Helpers/Image';
import { setGeolocation } from 'actions/geolocation';

class Step4 extends Component{
  constructor(){
    super();

    this.state ={
      didMount: false,
      isTransitioningNext: false
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({didMount: true})
    }, 250)
  }

  nextStep = () => {
    this.setState({isTransitioningNext: true})

    setTimeout(()=>{
      this.props.nextStep()
      this.setState({isTransitioningNext: false})
    }, 250)
  }

  // when geolocation is sucessfully fetched
  onSucessFetch = (pos) => {
    this.props.setGeolocation({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      timestamp: pos.timestamp
    });

    this.nextStep();
  }

  onErrorFetch = (err) => {
    console.log(err);
    this.nextStep()
  }

  render(){
    const {
      isTransitioningNext, didMount
    } = this.state

    return(
      <div
        className={"onboarding__wrapper" +
        (didMount ? " is-current" : "") +
        (isTransitioningNext ? " is-transitioning" : "")}>
        <div className="onboarding__left">
          <div className="onboarding__counter">
            <span></span>
            <span></span>
            <span></span>
            <span className="is-active"></span>
          </div>
          <div className="onboarding__title">Поделитесь своим  местоположением</div>
          <div className="onboarding__description">
            Позвольте нам предлагать для Вас самые ближайшие события за счет определения Вашей геолокации.
          </div>
          <div className="onboarding__cta">
            <div className="ui-buttons-group">
              <Geolocation
                lazy
                render={({
                  fetchingPosition,
                  position: { coords: { latitude, longitude } = {} } = {},
                  error,
                  getCurrentPosition
                }) =>
                  <React.Fragment>
                    <button
                      onClick={getCurrentPosition}
                      className="btn btn-primary">Продолжить</button>
                    {error &&
                      <div>
                        {error.message}
                      </div>}
                  </React.Fragment>}
                onSuccess={this.onSucessFetch}
                onError={this.onErrorFetch}/>
              <button
                onClick={this.nextStep}
                className="btn btn-primary btn-primary--invis">
                Пропустить
              </button>
            </div>
          </div>
        </div>
        <div className="onboarding__right">
          <div className="onboarding__wawy">
            <div className="onboarding__waves">
              <div className="onboarding__wave onboarding__wave--middle"></div>
              <div className="onboarding__wave onboarding__wave--top"></div>
            </div>
            <div className="onboarding__wawy-center">
              <Image folder="system" file="onboardingGeolocation.png" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Step4.propTypes = {
  geolocationRedux: PropTypes.object,
  setGeolocation: PropTypes.func
};

const mapStateToProps = (state) => ({
  geolocationRedux: state.geolocation
});

const mapDispatchToProps = (dispatch) => ({
  setGeolocation: (data) => dispatch(setGeolocation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
