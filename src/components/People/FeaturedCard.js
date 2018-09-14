import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Image from '../../components/Helpers/Image';
import SvgIcon from '../../components/Helpers/SvgIcon';
import ConvertMonthNumToName from '../../services/ConvertMonthNumToName';

class FeaturedPeople extends Component {

  constructor(){
    super()

    this.state = {

    }
  }

  convertDate = (str) => {
    const date = str.substring(0,2)
    const month = ConvertMonthNumToName(str.substring(2))

    return (
      <React.Fragment>
        <span>{date}</span>
        <span>{month}</span>
      </React.Fragment>
    )
  }

  onCardClick = () => {
    // act as a link for noEvent types
    if ( this.props.noEvent ){
      this.setState({
        haveRedirect: `/profile/${this.props.data.id}`
      })
    }
  }

  render(){

    const {
      data: {
        id,
        name,
        age,
        isVerified,
        distance,
        date,
        image,
        featuredEvent
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
            <div className="f-people__date">{this.convertDate(date)}</div>
          }
        </div>
        { !noEvent &&
          <div className="f-people__info">
            <div className="f-people__event-name">{featuredEvent.name}</div>
            <div className="f-people__event-line">
              <span>{featuredEvent.from}</span>
              <i className="icon icon-plane"></i>
              <span>{featuredEvent.to}</span>
            </div>
            <div className="f-people__event-description">{featuredEvent.text}</div>
            <div className="f-people__event-cta">
              <a href={featuredEvent.link} className="btn btn-outline btn-outline--white btn--block">Узнать больше</a>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default FeaturedPeople