import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import EventsGrid from 'components/Events/EventsGrid';
import RecommendedEvents from 'components/Events/RecommendedEvents';

class News extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Мои новости</title>
        </Helmet>
        <RecommendedEvents />
        <EventsGrid
          type="news" />
      </Fragment>
    );
  }
}

export default News;
