import React, { Component } from 'react';
import { Helmet } from "react-helmet";

class Invite extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Приглашения</title>
        </Helmet>
        <h1>Invite</h1>
      </React.Fragment>
    );
  }
}

export default Invite;
