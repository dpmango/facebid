import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import EventsGrid from 'components/Events/EventsGrid';
import Filters from 'components/Events/Filters';

class Events extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Поиск событий</title>
        </Helmet>
        <Filters />
        <EventsGrid
          type="search" />
      </React.Fragment>
    );
  }
}

export default Events;
