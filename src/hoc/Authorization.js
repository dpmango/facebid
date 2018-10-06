import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Athorization = (WrappedComponent) => {
  class WithAuthorization extends Component {

    render() {
      const { userId, match } = this.props;
      if (!userId) {
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                fromProtected: true,
                prevRoute: match.url
              }
            }} />
        )
      }

      return <WrappedComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => ({
    userId: state.user.userId
  });

  return connect(mapStateToProps, null)(WithAuthorization);
};

export default Athorization;
