import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SvgIcon from 'components/Helpers/SvgIcon';
import Tooltip from 'components/Helpers/Tooltip';
import VerificationButton from 'components/Shared/VerificationButton';
import {openModal} from 'actions/modal';

class EventCardAction extends Component {

  // render different actions from "my-events" page

  // flags
  // "isModerationPening": false,
  // "isModerationFailed": false,
  // "isDeclined": false,
  // "isPublished": false,
  // "isPublishedAdvertised": false,
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
      case "isPublished":
        return (
          <div className="ec-action__icon">
            <SvgIcon name="checkmark" />
          </div>
        )
      case "isPublishedAdvertised":
        return (
          <div className="ec-action__icon ec-action__icon--purple">
            <SvgIcon name="dollar-sign" />
          </div>
        )
      case "isPublishedTop":
        return (
          <div className="ec-action__icon ec-action__icon--purple">
            <SvgIcon name="arrow-top" />
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
          <Fragment>
            <div className="ec-action__title">Объявление находится на модерации</div>
            <div className="ec-action__description">
              Статус: ожидает проверки
              <Tooltip
                content="Контент" />
            </div>
          </Fragment>
        )
      case "isModerationFailed":
        return (
          <Fragment>
            <div className="ec-action__title">Событие не прошло модерацию</div>
            <div className="ec-action__description">
              Зачем это нужно?
              <Tooltip
                content="Контент" />
            </div>
          </Fragment>

        )
      case "isDeclined":
        return (
          <Fragment>
            <div className="ec-action__title">Отклонено</div>
            <div className="ec-action__description">
              Причина отклонения
              <Tooltip
                content="Контент" />
            </div>
          </Fragment>
        )
      case "isPublished":
        return (
          <Fragment>
            <div className="ec-action__title">Опубликовано</div>
          </Fragment>
        )
      case "isPublishedAdvertised":
        return (
          <Fragment>
            <div className="ec-action__title">Опубликовано</div>
            <div className="ec-action__description">
              Рекламное объявление
            </div>
          </Fragment>
        )
      case "isPublishedTop":
        return (
          <Fragment>
            <div className="ec-action__title">В ТОП</div>
            <div className="ec-action__description">
              Событие находится в ТОП до 21.02
            </div>
          </Fragment>
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
      case "isPublished":
        const shareProviders = [
          {status: true, name: "facebook"},
          {status: false, name: "vkontakte"},
          {status: false, name: "twitter"},
        ]
        return (
          <div className="ec-action__cta-wrapper">
            { // this.props.userBalance.promote ?
              Math.random() > 0.5 ?
              <Fragment>
                <span className="ec-action__cta-name">
                  Доступен бесплатный boost
                </span>
                <button
                  onClick={this.promoteFree}
                  className="btn btn-primary btn-primary--violet btn--iconed">
                  <SvgIcon name="rocket" />
                  <span>Поднять бесплатно</span>
                </button>
              </Fragment>
              :
              <Fragment>
                <span className="ec-action__cta-name">
                  Получите бонус за share
                </span>
                <div className="verifications">
                  { shareProviders.map(provider => (
                    <VerificationButton
                      verified={provider.status}
                      provider={provider.name} />
                  ))}
                </div>
              </Fragment>
            }

          </div>
        )
      case "isPublishedAdvertised":
        return null
      case "isPublishedTop":
        return null
      default:
        return null
    }
  }

}

EventCardAction.propTypes = {
  actionFlag: PropTypes.string,
  openModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  userBalance: state.user.userBalance
})

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCardAction)
