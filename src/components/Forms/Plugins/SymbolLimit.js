import React, {Component} from 'react';
import throttle from 'lodash/throttle';

class symbolLimit extends Component {
  constructor(props){
    super(props)

    this.state = {
      value: '',
      isValid: null,
      symbolsLeft: props.max
    }

    this.throttledOnchange = throttle(this.updateLengthParams, 50);
  }

  componentDidMount(){
    this.throttledOnchange()
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

  updateLengthParams = () => {
    const {
      state: {value},
      props: {max}
    } = this

    let isValid
    if ( value.length < max ){
      isValid = true
    } else {
      isValid = false
    }

    this.setState({
      isValid: isValid,
      symbolsLeft: max - value.length
    })
  }

  render(){
    const {
      state: {symbolsLeft, isValid}
    } = this;

    return(
      <div className={"ui-length-meter" + (isValid ? " is-valid" : " is-failed")}>
        <span>{isValid ? "Осталось" : "Лишнии"} {symbolsLeft} символов</span>
      </div>
    )
  }
}

export default symbolLimit
