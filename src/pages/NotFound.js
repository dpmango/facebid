import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setClass } from '../actions/page'

class NotFound extends Component {

  componentDidMount(){
    this.props.aosInst.refreshHard();
    this.props.setPageClass('no-sidebar')
  }

  render() {
    return (
      <div className="not-found">
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  setPageClass: (data) => dispatch(setClass(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
