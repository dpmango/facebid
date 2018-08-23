import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TestComponenet extends Component {
  static propTypes = {

  };

  componentDidMount(){
    this.props.aosInst.refreshHard()
  }

  render() {
    return (
      <div className="---">

      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TestComponenet);
