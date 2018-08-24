import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Filters from '../components/Events/Filters';
import EventsGrid from '../components/Events/EventsGrid';

class Home extends Component {
  static propTypes = {

  };

  componentDidMount(){
    this.props.aosInst.refreshHard()
  }

  render() {
    return (
      <React.Fragment>
        <Filters />
        <EventsGrid />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
