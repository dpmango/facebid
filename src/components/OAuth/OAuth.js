import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SOCIAL_LOGIN_BACKEND_URL } from '../../services/Api'
import SvgIcon from '../Helpers/SvgIcon';

class OAuth extends Component {

  constructor(){
    super()

    this.state = {
      user: {},
      disabled: ''
    }

  }

  componentDidMount() {
    const { socket, provider } = this.props

    socket.on(provider, user => {
      this.popup.close()
      this.setState({user})
    })
  }

  checkPopup = () => {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  openPopup = () => {
    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${SOCIAL_LOGIN_BACKEND_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  closeCard = () => {
    this.setState({user: {}})
  }

  render() {
    // const { name, photo} = this.state.user
    const { provider } = this.props
    // const { disabled } = this.state

    return (
      <div
        onClick={this.startAuth}
        className={`social-btn social-btn--${provider}`}>
        <div className="social-btn__icon">
          <SvgIcon name={provider} />
        </div>
        <span>{provider}</span>
      </div>
    )
  }
}

OAuth.propTypes = {
 provider: PropTypes.string.isRequired,
 socket: PropTypes.func.isRequired
}

export default OAuth
