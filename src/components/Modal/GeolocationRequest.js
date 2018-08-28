import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Geolocation from 'react-geolocation';
import Modal from '../Modal/Modal';
import Image from '../Helpers/Image';
import { setGeolocation } from '../../actions/geolocation';

// TODO
// refresh the request every `1 hour` or so ?
// (compare geolocationRedux.timestamp with Date.now()

class GeolocationRequest extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalOpened: false,
      latitude: props.geolocationRedux.latitude,
      longitude: props.geolocationRedux.longitude,
      accuracy: props.geolocationRedux.accuracy,
      timestamp: props.geolocationRedux.timestamp
    }
  }

  componentDidMount() {
    if ( this.state.latitude === null ) {
      // show the modal only if no data is present in redux
      setTimeout(() => {
        this.show();
      }, 5000)
    }
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

  // when geolocation is sucessfully fetched
  onSucessFetch = (pos) => {
    this.props.setGeolocation({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      timestamp: pos.timestamp
    });

    this.hide();
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
                onSuccess={this.onSucessFetch}
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

GeolocationRequest.propTypes = {
  geolocationRedux: PropTypes.object
};

const mapStateToProps = (state) => ({
  geolocationRedux: state.geolocation
});

const mapDispatchToProps = (dispatch) => ({
  setGeolocation: (data) => dispatch(setGeolocation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GeolocationRequest);
