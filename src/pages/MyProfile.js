import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHead from '../components/Profile/ProfileHead';
import EventsGrid from '../components/Events/EventsGrid';

class MyProfile extends Component {
  componentDidMount(){
    this.props.aosInst.refreshHard()
  }

  render() {
    return (
      <React.Fragment>
        <ProfileHead />
        <EventsGrid type="my-profile" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
