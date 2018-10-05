import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from 'services/Api';
import Head from 'components/Profile/Head';
import EventsGrid from 'components/Events/EventsGrid';
import Loading from 'components/Helpers/Loading';
import RecommendedProfiles from 'components/People/RecommendedProfiles';
import {openModal} from 'actions/modal';

class Profile extends Component {
  constructor(props){
    super(props);

    this.origin = props.match.path.split("/")[1]
    this.paramsId = parseInt(props.match.params.id, 10)

    this.state = {
      profileId: null,
      isMyProfile: null
    }
  }

  componentWillMount(){
    if ( this.origin === "profile" ){
      this.setState({
        profileId: this.paramsId,
        isMyProfile: this.props.userId === this.paramsId
      })
    } else if ( this.origin === "event" ){
      this.getProfileId()
        .then(res => {
          this.setState({
            profileId: res,
            isMyProfile: this.props.userId === res
          })

          this.props.openModal({
            name: "event",
            options: {
              eventId: this.paramsId
            }
          })
        })
    }
  }

  // if type is event, it will opend
  getProfileId = () => {
    return api
      .get(`events?id=${this.paramsId}`)
      .then(res => {
        console.log(res.data)
        return res.data[0].user.id
      })
      .catch(err => {
        console.log('some error happends trying to fetch events', err)
      })
  }

  render() {
    const { profileId, isMyProfile } = this.state;

    if ( !profileId ){
      return <Loading />
    }
    return (
      <Fragment>
        <Head
          profileId={profileId}
          isMyProfile={isMyProfile} />
        <EventsGrid
          type="profile"
          isMyProfile={isMyProfile} />
        {!isMyProfile &&
          <RecommendedProfiles />
        }
      </Fragment>
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
  openModal: (data) => dispatch(openModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
