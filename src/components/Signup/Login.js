import React, {Component} from 'react';
import Modal from '../Modal/Modal';

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalOpened: false
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  show = () => {
    this.setState({
      modalOpened: true
    })
  }

  hide = () => {
    this.setState({
      modalOpened: false
    })
  }

  render(){
    return(
      <Modal
        isActive={this.state.modalOpened}
        onHide={this.hide}
        >
        <h2>Login modal</h2>
        <button onClick={this.hide}>Close</button>
      </Modal>
    )
  }
}

export default Login
