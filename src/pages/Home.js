import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Filters from '../components/Events/Filters';
import GuestFilters from '../components/Events/GuestFilters';
import EventsGrid from '../components/Events/EventsGrid';

class Home extends Component {
  static propTypes = {

  };

  componentDidMount(){
    this.props.aosInst.refreshHard()
  }

  render() {
    return (
      <React.Fragment>
        { this.props.userId ? <Filters /> : <GuestFilters /> }
        <EventsGrid />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
