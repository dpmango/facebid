import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { openModal } from '../actions/modal'

const Athorization = (WrappedComponent) => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      // userId: PropTypes.bool
    };

    openLoginModal = () => {
      this.props.openModal('login');
    }

    render() {
      const { userId } = this.props;

      if (!userId) {
        return (
          <React.Fragment>
            <Redirect to='/' />
            {this.openLoginModal()}
          </React.Fragment>
        )
      }

      return <WrappedComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => ({
    userId: state.user.userId
  });

  const mapDispatchToProps = (dispatch) => ({
    openModal: (data) => dispatch(openModal(data))
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthorization);
};

export default Athorization;
