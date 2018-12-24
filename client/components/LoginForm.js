import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import AuthForm from './AuthForm';
import query from '../queries/currentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.setState({ errors: [] });
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch(err => {
        const { graphQLErrors, message } = err;
        const errors = _.isEmpty(graphQLErrors)
          ? [message]
          : graphQLErrors.map(g => g.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

const mutation = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default graphql(query)(graphql(mutation)(LoginForm));
