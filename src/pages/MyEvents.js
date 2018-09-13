import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/Api';
import NoEvents from '../components/Events/NoEvents';

class MyEvents extends Component {
  constructor(){
    super()

    this.state = {
      events: []
    }
  }

  componentDidMount(){
    this.props.aosInst.refreshHard()
    this.getEvents()
  }

  getEvents = () => {
    // api
    //   .get('my-events')
    //   .then(res => {
    //
    //   })
    //   .catch(err => {
    //     console.log('error fetching my events'))
    //   }
  }

  render() {

    const {
      state: {events}
    } = this

    return (
      <React.Fragment>
        { events.length === 0 &&
          <NoEvents />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
