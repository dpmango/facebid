import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import Filters from 'components/Events/Filters';
// import GuestFilters from 'components/Events/GuestFilters';
import EventsGrid from 'components/Events/EventsGrid';

class Home extends Component {
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

Home.propTypes = {
  userId: PropTypes.number
}
export default connect(mapStateToProps, null)(Home);
