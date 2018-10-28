import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setClass } from 'actions/page';

class NotFound extends Component {

  componentDidMount(){
    this.props.setPageClass('no-sidebar')
  }

  render() {
    return (
      <div className="err-page">
        <Helmet>
          <title>Ошибка - страница не найдена (404)</title>
        </Helmet>
        <div className="container">
          <div className="err-page__wrapper">
            <div className="err-page__picture">
              <div className="err-page__waves">
                <div className="err-page__wave err-page__wave--center"></div>
                <div className="err-page__wave err-page__wave--middle"></div>
                <div className="err-page__wave err-page__wave--top"></div>
              </div>
              <div className="err-page__code err-page__code--404">
                <div className="err-page__code-4">4</div>
                <div className="err-page__code-center"></div>
                <div className="err-page__code-4">4</div>
              </div>
            </div>
            <div className="err-page__contents">
              <div className="err-page__title">Ничего не найдено</div>
              <div className="err-page__description">Возможно, страница, которую Вы ищите  <br/>не существует или была удалена</div>
              <div className="err-page__cta">
                <Link to="/" className="btn btn-primary">Вернуть на главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  setPageClass: PropTypes.func
}


const mapDispatchToProps = (dispatch) => ({
  setPageClass: (data) => dispatch(setClass(data))
});

export default connect(null, mapDispatchToProps)(NotFound);
