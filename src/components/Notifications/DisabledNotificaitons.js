import React, {Component} from 'react';
import { connect } from 'react-redux';
import i18n from 'i18n/Notifications';
import SvgIcon from '../Helpers/SvgIcon';
import { openModal } from 'actions/modal';

class DisabledNotificaitons extends Component{
  openSettings = () => {
    this.props.openModal({
      name: "settings",
      options: {
        currentTab: 2 // open on notifications
      }
    })
  }

  render(){
    return(
      <div className="modal__content">
        <div className="centered-info centered-info--modal">
          <div className="centered-info__holder t-center">
            <SvgIcon name="notification-disabled" />
            <div className="h4-title">{i18n[this.props.lang].disabled.title}</div>
            <p className="t-primary">{i18n[this.props.lang].disabled.description}</p>
            <button
              onClick={this.openSettings}
              className="btn btn-primary">
              Перейти в настройки
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  lang: state.lang.lang
})

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisabledNotificaitons);
