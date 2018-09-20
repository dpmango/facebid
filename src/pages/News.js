import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import EventsGrid from 'components/Events/EventsGrid';

class News extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Мои новости</title>
        </Helmet>
        <EventsGrid
          type="news" />
      </Fragment>
    );
  }
}

export default News;
