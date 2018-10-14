import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import SelectEvent from 'components/Invites/SelectEvent';
import SearchResults from 'components/Invites/SearchResults';

class Invite extends Component {
  constructor(){
    super()

    this.state = {
      selectedEvent: null
    }
  }

  selectEvent = (id) => {
    this.setState({selectedEvent: id})
  }

  render() {
    const {selectedEvent} = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Приглашения</title>
        </Helmet>
        <SelectEvent
          onSelectEvent={this.selectEvent}
          selected={selectedEvent} />
        <SearchResults
          selected={selectedEvent} />
      </Fragment>
    );
  }
}

export default Invite;
