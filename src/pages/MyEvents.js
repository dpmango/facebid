import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/Api';
import EventsGrid from '../components/Events/EventsGrid';
import NoEvents from '../components/Events/NoEvents';

class MyEvents extends Component {
  constructor(){
    super()

    this.state = {
      eventsCounter: null
    }
  }

  componentDidMount(){
    this.props.aosInst.refreshHard()
    this.getEvents()
  }

  getEvents = () => {
    api
      .get('myEventsCounter')
      .then(res => {
        this.setState({
          eventsCounter: res.data.counter
        })
      })
      .catch(err => {
        console.log('error fetching my events')
      })
  }

  // just an temporary toggle to show different states
  _tempToggleCounter = () => {
    const {eventsCounter} = this.state;

    if ( eventsCounter ){
      this.setState({eventsCounter: null})
    } else {
      this.getEvents()
    }
  }

  render() {

    const {
      state: {eventsCounter}
    } = this

    return (
      <React.Fragment>
        <Helmet>
          <title>Мои события</title>
        </Helmet>
        <div className="t-center">
          <button
            onClick={this._tempToggleCounter}
            className="btn btn-primary">
            <small>(tmp)</small> Показать {eventsCounter ? "пустое" : "события"}
          </button>
        </div>
        { !eventsCounter &&
          <NoEvents />
        }
        { eventsCounter &&
          <EventsGrid
            type="my-events" />
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
