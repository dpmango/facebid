import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import EventsGrid from 'components/Events/EventsGrid';

class News extends Component {
  componentDidMount(){
    this.props.aosInst.refreshHard()
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Мои новости</title>
        </Helmet>
        <EventsGrid
          type="news" />
      </React.Fragment>
    );
  }
}

export default News;
