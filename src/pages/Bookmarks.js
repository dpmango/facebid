import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import EventsGrid from 'components/Events/EventsGrid';

class Bookmarks extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Мои Закладки</title>
        </Helmet>
        <EventsGrid
          type="bookmarks" />
      </React.Fragment>
    );
  }
}

export default Bookmarks;
