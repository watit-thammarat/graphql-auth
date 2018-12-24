import React, { Component } from 'react';
import _ from 'lodash';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className="row">
        <form className="col s4" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-field">
            <label>Email:</label>
            <input
              name="email"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div className="input-field">
            <label>Password:</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          {!_.isEmpty(this.props.errors) && (
            <div className="errors">
              {_.map(this.props.errors, (e, i) => (
                <div key={i}>{e}</div>
              ))}
            </div>
          )}
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
