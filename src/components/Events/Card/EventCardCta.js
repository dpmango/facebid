import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AvatarList from 'components/People/AvatarList';
import SvgIcon from 'components/Helpers/SvgIcon';
import { openModal } from 'actions/modal';

class EventCardCta extends Component {

  constructor(props){
    super(props);

    let shouldRenderParticipants = true
    if (
      props.actionFlag === "isModerationPening" ||
      props.actionFlag === "isModerationFailed" ||
      props.actionFlag === "isDeclined"
    ){
      shouldRenderParticipants = false
    }

    this.state = {
      shouldRenderParticipants: shouldRenderParticipants
    }
  }

  enrollEvent = () => {
    const { userId } = this.props;

    if ( !userId ){
      this.props.openModal('signup');
      return
    }

    this.props.openModal({
      name: 'participate',
      options: {
        eventId: this.props.id
      }
    })
  }

  renderCtaButton = (actionFlag) => {

    if ( actionFlag === "isModerationPening" ){
      return (
        <button className="btn btn-primary btn--iconed" disabled>
          <SvgIcon name="checkmark" />
          <span>Редактировать</span>
        </button>
      )
    }

    if ( actionFlag === "isModerationFailed" ||
        actionFlag === "isPublished" ||
        actionFlag === "isPublishedAdvertised" ||
        actionFlag === "isPublishedTop"
      ){
      return (
        <button
          onClick={this.props.onEditModeClick}
          className="btn btn-primary btn--iconed">
          <SvgIcon name="checkmark" />
          <span>Редактировать</span>
        </button>
      )
    }

    if ( !actionFlag ) {
      // regular card
      return(
        <button
          onClick={this.enrollEvent}
          className="btn btn-primary btn--iconed">
          <SvgIcon name="checkmark" />
          <span>Участвовать</span>
        </button>
      )
    }
  }

  render(){
    const avatars = {
      more: 14,
      list: [
        { id: 1, file: "userAvatar_2.jpg" },
        { id: 2, file: "userAvatar_3.jpg" },
        { id: 3, file: "userAvatar_4.jpg" },
        { id: 4, file: "userAvatar_5.jpg" },
        { id: 5, file: "userAvatar_6.jpg" }
      ]
    }

    const {
      props: { actionFlag, editMode },
      state: { shouldRenderParticipants }
    } = this

    if ( editMode ){
      return null
    }

    return(
      <div className="e-card__cta-wrapper">
        {this.renderCtaButton(actionFlag)}

        { shouldRenderParticipants &&
          <div className="e-card__participants">
            <AvatarList
              avatars={avatars} />
          </div>
        }

        <div
          onClick={this.props.onScrollTopClick}
          className="e-card__scrolltop">
          <SvgIcon name="up-arrow" />
        </div>
      </div>
    )
  }
}

EventCardCta.propTypes = {
  openModal: PropTypes.func,
  userId: PropTypes.number
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
})

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCardCta);
