import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/Profile/Head';
import EventsGrid from '../components/Events/EventsGrid';
import RecommendedProfiles from '../components/People/RecommendedProfiles';

class Profile extends Component {
  constructor(props){
    super(props);

    this.isMyProfile = props.userId === parseInt(props.match.params.id, 10)
  }

  componentDidMount(){
    this.props.aosInst.refreshHard()
  }

  render() {

    return (
      <React.Fragment>
        <Head
          urlParams={this.props.match.params}
          isMyProfile={this.isMyProfile} />
        <EventsGrid
          type="profile"
          isMyProfile={this.isMyProfile} />
        {!this.isMyProfile &&
          <RecommendedProfiles />
        }
      </React.Fragment>
    );
  }
}

PropTypes.PropTypes = {
  userId: PropTypes.number
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
