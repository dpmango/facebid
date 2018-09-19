import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/Helpers/SvgIcon';
import Tooltip from 'components/Helpers/Tooltip';

class EventCardAction extends Component {

  // render different actions from "my-events" page

  // props
  // "isModerationPening": false,
  // "isModerationFailed": false,
  // "isDeclined": false,
  // "isPublishedFree": false,
  // "isPublishedPremium": false,
  // "isPublishedShareBonus": false,
  // "isPublishedTop": false


  // different type of actions
  declineModeration = () => {
    // + API Call
  }

  sendToModeration = () => {
    // + API Call
  }

  placePayed = () => {
    // + API Call
  }

  promoteFree = () => {
    // + API Call
  }

  render(){
    const { actionFlag } = this.props

    if ( !actionFlag ){
      return null
    }

    return(
      <div className="ec-action">
        {this.renderIcon()}
        <div className="ec-action__content">
          {this.renderContent()}
        </div>
        <div className="ec-action__cta">
          {this.renderCta()}
        </div>
      </div>
    )
  }


  // helper renders
  renderIcon = () => {

    switch(this.props.actionFlag){
      case "isModerationPening":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="time" />
          </div>
        )
      case "isModerationFailed":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="eye" />
          </div>
        )
      case "isDeclined":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="close" />
          </div>
        )
      case "isPublishedFree":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="checkmark" />
          </div>
        )
      case "isPublishedPremium":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      case "isPublishedShareBonus":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      case "isPublishedTop":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      default:
        return null
    }
  }

  // content
  renderContent = () => {

    switch(this.props.actionFlag){
      case "isModerationPening":
        return (
          <React.Fragment>
            <div className="ec-action__title">Объявление находится на модерации</div>
            <div className="ec-action__description">
              Статус: ожидает проверки
              <Tooltip
                content="Контент" />
            </div>
          </React.Fragment>
        )
      case "isModerationFailed":
        return (
          <React.Fragment>
            <div className="ec-action__title">Событие не прошло модерацию</div>
            <div className="ec-action__description">
              Зачем это нужно?
              <Tooltip
                content="Контент" />
            </div>
          </React.Fragment>

        )
      case "isDeclined":
        return (
          <React.Fragment>
            <div className="ec-action__title">Отклонено</div>
            <div className="ec-action__description">
              Причина отклонения
              <Tooltip
                content="Контент" />
            </div>
          </React.Fragment>
        )
      case "isPublishedFree":
        return (
          <React.Fragment>
            <div className="ec-action__title">Опубликовано</div>
          </React.Fragment>
        )
      case "isPublishedPremium":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      case "isPublishedShareBonus":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      case "isPublishedTop":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      default:
        return null
    }
  }


  renderCta = () => {

    switch(this.props.actionFlag){
      case "isModerationPening":
        return (
          <button
            onClick={this.declineModeration}
            className="btn btn-outline btn-outline--muted btn--iconed">
            <SvgIcon name="close" />
            <span>Отозвать модерацию</span>
          </button>
        )
      case "isModerationFailed":
        return (
          <button
            onClick={this.sendToModeration}
            className="btn btn-outline btn--iconed">
            <SvgIcon name="checkmark-circle" />
            <span>Отправить на модерацию</span>
          </button>
        )
      case "isDeclined":
        return (
          <button
            onClick={this.placePayed}
            className="btn btn-primary btn-primary--violet btn--iconed">
            <SvgIcon name="dollar-sign" />
            <span>Разместить платно</span>
          </button>
        )
      case "isPublishedFree":
        return (
          <div className="ec-action__cta-wrapper">
            <span className="ec-action__cta-name">
              Доступен бесплатный boost
            </span>
            <button
              onClick={this.promoteFree}
              className="btn btn-primary btn-primary--violet btn--iconed">
              <SvgIcon name="rocket" />
              <span>Поднять бесплатно</span>
            </button>
          </div>
        )
      case "isPublishedPremium":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      case "isPublishedShareBonus":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      case "isPublishedTop":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="" />
          </div>
        )
      default:
        return null
    }
  }

}

EventCardAction.propTypes = {
  actionFlag: PropTypes.string
}

export default EventCardAction
