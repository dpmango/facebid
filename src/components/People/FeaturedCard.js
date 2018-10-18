import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';
import EventCardDate from 'components/Events/Card/EventCardDate';
import {openModal} from 'actions/modal';

class FeaturedPeople extends Component {
  constructor(){
    super()

    this.state = {
      haveRedirect: null
    }
  }

  onCardClick = () => {
    // act as a link for noEvent types
    if ( this.props.noEvent ){
      this.setState({
        haveRedirect: `/profile/${this.props.data.id}`
      })
    } else {
      this.props.openModal({
        name: "event",
        options: {
          eventId: this.props.data.event.id
        }
      })
    }
  }

  render(){

    const {
      data: {
        name,
        age,
        isVerified,
        distance,
        date,
        image,
        event
      },
      noEvent
    } = this.props;

    const { haveRedirect } = this.state

    if ( haveRedirect ){
      return <Redirect to={haveRedirect} />
    }

    return (
      <div onClick={this.onCardClick} className={"f-people" +(noEvent ? " have-no-info" : "")}>
        <div className="f-people__image">
          <Image file={image} />
        </div>
        <div className="f-people__general">
          <div className="f-people__general-content">
            <div className="f-people__line">
              <div className="f-people__name">{name}, {age}</div>
              <div className="f-people__status">
                {isVerified &&
                  <div className="icon-verified">
                    <SvgIcon name="checkmark" />
                  </div>
                }
              </div>
            </div>
            <div className="f-people__distance">{distance}</div>
          </div>
          { !noEvent &&
            <EventCardDate
              date={date}
              baseClass="f-people__date" />
          }
        </div>
        { !noEvent &&
          <div className="f-people__info">
            <div className="f-people__event-name">{event.name}</div>
            <div className="f-people__event-line">
              <span>{event.from}</span>
              <i className="icon icon-plane"></i>
              <span>{event.to}</span>
            </div>
            <div className="f-people__event-description">{event.text}</div>
            <div className="f-people__event-cta">
              <button
                className="btn btn-outline btn-outline--white btn--block">
                Узнать больше
              </button>
            </div>
          </div>
        }
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(null, mapDispatchToProps)(FeaturedPeople)
