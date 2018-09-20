import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';
// import api from 'services/Api';
import debounce from 'lodash/debounce';

class AvailableName extends Component {
  constructor(){
    super()

    this.state = {
      value: '',
      isValid: null
    }

    this.throttledOnchange = debounce(this.checkAvailable, 1000);
  }


  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value};
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value){
      this.throttledOnchange()
    }
  }

  checkAvailable = () => {
    // check from api
    const { value } = this.state
    if ( value.length > 3 ){
      if ( value.length < 10 ){
        this.setState({ isValid: true })
      } else {
        this.setState({ isValid: false })
      }
    }

  }

  render(){
    const {
      state: {isValid}
    } = this;

    if ( isValid === null ){
      return null
    } else {
      return(
        <div className={"ui-available-name" + (isValid ? " is-valid" : " is-failed")}>
          <div className="ui-available-name__icon">
            <SvgIcon name="checkmark" />
          </div>
          <span>Имя {isValid ? "Доступно" : "Недоступно"}</span>
        </div>
      )
    }
  }
}

export default AvailableName
