import React, {Component} from 'react';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Geolocation from 'react-geolocation';
import Modal from '../Modal/Modal';
import Image from '../Helpers/Image';

class GeolocationRequest extends Component{
  constructor(){
    super()
    this.state = {
      modalOpened: false,
      latitude: null,
      longitude: null,
      accuracy: null,
      timestamp: null
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
    const {
      state: {
        latitude, longitude
      }
    } = this

    return(
      <Modal
        isActive={this.state.modalOpened}
        onHide={this.hide}
        >
        <div className="modal-alert">
          <div className="modal-alert__image">
            <Image file="alertModal.png" />
          </div>
          <div className="modal-alert__contents">
            <div className="h4-title">Поделитесь своим местоположением</div>
            <p className="modal-alert__paragraph t-primary">Позвольте нам предлагать для Вас самые ближайшие события за счет определения  Вашей геолокации.</p>
            <div className="modal-alert__actions">
              <Geolocation
                // TODO
                // show modal only if no position fetched auto
                lazy
                render={({
                  fetchingPosition,
                  position: { coords: { latitude, longitude } = {} } = {},
                  error,
                  getCurrentPosition
                }) =>
                  <React.Fragment>
                    <button onClick={getCurrentPosition} className="btn btn-primary">Поделиться</button>
                    {error &&
                      <div>
                        {error.message}
                      </div>}
                  </React.Fragment>}
                onSuccess={(pos) => {
                  this.setState({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                    timestamp: pos.timestamp
                  })
                }}
              />
              <span className="t-link-small" onClick={this.hide}>напомнить позже</span>
              {latitude &&
                <span className="modal-alert__geo-test">{latitude}, {longitude}</span>
              }
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(GeolocationRequest);
