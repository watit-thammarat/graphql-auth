import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

import query from '../queries/currentUser';

class Header extends Component {
  handleLoggout(e) {
    e.preventDefault();
    this.props
      .mutate({ refetchQueries: [{ query }] })
      .then(() => {
        console.log('logged out');
        // this.props.data.refetch();
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <div>
          <a onClick={this.handleLoggout.bind(this)}>Logout</a>
        </div>
      );
    }
    return (
      <div>
        <li>
          <Link to="signup">Sign Up</Link>
        </li>
        <li>
          <Link to="login">Log In</Link>
        </li>
      </div>
    );
  }
  render() {
    return (
      <nav className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">{this.renderButtons()}</ul>
      </nav>
    );
  }
}

const mutation = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;

export default graphql(mutation)(graphql(query)(Header));
