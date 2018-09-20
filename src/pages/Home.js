import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Filters from 'components/Events/Filters';
import GuestFilters from 'components/Events/GuestFilters';
import EventsGrid from 'components/Events/EventsGrid';

class Home extends Component {

  componentDidMount(){
    this.props.aosInst.refreshHard()
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Facebid</title>
        </Helmet>
        <Filters />
        {/* { this.props.userId ? <Filters /> : <GuestFilters /> } */}
        <EventsGrid />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
});

export default connect(mapStateToProps, null)(Home);
