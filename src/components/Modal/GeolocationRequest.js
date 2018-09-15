import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import Geolocation from 'react-geolocation';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Image from '../Helpers/Image';
import { setGeolocation, setIpLookup } from '../../actions/geolocation';
import { openModal, closeModal } from '../../actions/modal'

// TODO
// refresh the request every `1 hour` or so ?
// (compare geolocationRedux.timestamp with Date.now()

class GeolocationRequest extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'geolocation',
      latitude: props.geolocationRedux.latitude,
      longitude: props.geolocationRedux.longitude,
      accuracy: props.geolocationRedux.accuracy,
      timestamp: props.geolocationRedux.timestamp
    }
  }

  componentDidMount() {
    this.ipLookUp()
    // if ( !this.props.geolocationRedux.iplookup ){
    //   this.ipLookUp()
    // }

    if ("geolocation" in navigator) {
      // geolocation enabled
      if ( this.state.latitude === null ) {
        // show the modal only if no data is present in redux
        setTimeout(() => {
          // this.show();
        }, 5000)
      }
    } else {
      console.log('geolocation is not enabled on this browser');
      this.ipLookUp()
    }

  }

  show = () => {
    this.props.openModal(
      this.state.modalName
    )
  }

  hide = () => {
    this.props.closeModal()
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

  onErrorFetch = (err) => {
    console.log(err);
    this.ipLookUp();
  }

  // geolocation backup and error state
  ipLookUp = async () => {

    // backup options
    // https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript

    await axios
      .get(`https://ipapi.co/json/`)
      .then(res => {
        let result = res.data
        result.timestamp = new Date();
        this.props.setIpLookup(result)
      })
      .catch(err => {
        console.log('error catching ip lookup')
      })
  }

  // google api reverse geocoding
  // getAddress = (latitude, longitude) => {
  //   const GOOGLE_MAP_KEY = 'xxxxxx'
  //
  //   axios
  //     .get('https://maps.googleapis.com/maps/api/geocode/json?
  //             latlng=' + latitude + ',' + longitude + '&key=' + GOOGLE_MAP_KEY)
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log('error catching ip lookup')
  //     })
  // }

  render(){
    const {
      state: {
        modalName, latitude, longitude
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}
        >
        <div className="modal-alert">
          <div className="modal-alert__image">
            <Image folder="system" file="alertModal.png" />
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
                onError={this.onErrorFetch}
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
  geolocationRedux: PropTypes.object,
  setGeolocation: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  geolocationRedux: state.geolocation,
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  setGeolocation: (data) => dispatch(setGeolocation(data)),
  setIpLookup: (data) => dispatch(setIpLookup(data)),
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(GeolocationRequest);
