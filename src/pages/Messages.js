import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';

class Messages extends Component {

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Мои сообщения</title>
        </Helmet>
        <h1>Messages</h1>
      </React.Fragment>
    );
  }
}


export default Messages
