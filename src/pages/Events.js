import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import EventsGrid from 'components/Events/EventsGrid';
import Filters from 'components/Events/Filters';

class Events extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Поиск событий</title>
        </Helmet>
        <Filters
          type="search" />
        <EventsGrid
          type="search" />
      </Fragment>
    );
  }
}

export default Events;
