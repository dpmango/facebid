import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Invite extends Component {
  componentDidMount(){
    this.props.aosInst.refreshHard()
  }

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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
