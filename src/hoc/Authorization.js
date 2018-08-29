import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Athorization = (WrappedComponent) => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      // userId: PropTypes.bool
    };

    render() {
      const { userId } = this.props;

      if (!userId) {
        // TODO
        // tirgger modal login
        return <Redirect to='/' />;
      }

      return <WrappedComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => (
    {
      userId: state.user.userId
    }
  );

  return connect(mapStateToProps)(WithAuthorization);
};

export default Athorization;
