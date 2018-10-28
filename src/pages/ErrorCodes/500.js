import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { setClass } from 'actions/page';
import SvgIcon from 'components/Helpers/SvgIcon';

class ServerError extends Component {
  componentDidMount(){
    this.props.setPageClass('no-sidebar')
  }

  render() {
    return (
      <div className="err-page">
        <Helmet>
          <title>Ошибка - сервер не отвечает (500)</title>
        </Helmet>
        <div className="container">
          <div className="err-page__wrapper err-page__wrapper--500">
            <div className="err-page__picture">
              <div className="err-page__waves">
                <div className="err-page__wave err-page__wave--center"></div>
                <div className="err-page__wave err-page__wave--middle"></div>
                <div className="err-page__wave err-page__wave--top"></div>
              </div>
              <div className="err-page__code err-page__code--500">
                <div className="err-page__code-500ico">
                  <SvgIcon name="err-500" />
                </div>
                <div className="err-page__code-center">
                  <div className="err-page__code-center-dots"></div>
                </div>
              </div>
            </div>
            <div className="err-page__contents">
              <div className="err-page__pretitle">Ошибка 500</div>
              <div className="err-page__title">Сервер временно недоступен</div>
              <div className="err-page__description">По какому-то волшебству свервер не отвечает.<br/> Мы уже решаем проблему</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ServerError.propTypes = {
  setPageClass: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  setPageClass: (data) => dispatch(setClass(data))
});

export default connect(null, mapDispatchToProps)(ServerError);
