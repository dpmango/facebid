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

    const urlParams = this.props.match.params
    return (
      <React.Fragment>
        <ProfileHead
          profileID={urlParams} />
        <EventsGrid
          profileID={urlParams}
          type="my-profile" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
