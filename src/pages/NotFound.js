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
      <div className="not-found">
        <Helmet>
          <title>Ошибка - страница не найдена (404)</title>
        </Helmet>
        <div className="container">
          <div className="not-found__wrapper">
            <div className="not-found__picture">
              <div className="not-found__waves">
                <div className="not-found__wave not-found__wave--center"></div>
                <div className="not-found__wave not-found__wave--middle"></div>
                <div className="not-found__wave not-found__wave--top"></div>
              </div>
              <div className="not-found__404">
                <div className="not-found__404-4">4</div>
                <div className="not-found__404-center"></div>
                <div className="not-found__404-4">4</div>
              </div>
            </div>
            <div className="not-found__contents">
              <div className="not-found__title">Ничего не найдено</div>
              <div className="not-found__description">Возможно, страница, которую Вы ищите  <br/>не существует или была удалена</div>
              <div className="not-found__cta">
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
