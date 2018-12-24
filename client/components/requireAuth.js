import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import query from '../queries/currentUser';

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    checkAuth() {
      const { loading, user } = this.props.data;

      if (!loading && !user) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(query)(RequireAuth);
};
