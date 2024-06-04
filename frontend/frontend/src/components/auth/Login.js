import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser(username, password);
    this.setState({
      username: "",
      password: "",
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }

    const { username, password } = this.state;

    return (
      <>
        {this.props.loading ? (
          "loading.."
        ) : (
          <>
            <div as="h2" className="text-center text-teal">
              Log-in to your account
            </div>
            <Form size="large" onSubmit={this.onSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  value={username}
                  name="username"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Button variant="teal" type="submit" size="lg" block>
                Login
              </Button>
            </Form>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  loading: state.authReducer.loading,
  error: state.errorReducer,
  message: state.messageReducer,
});

export default connect(mapStateToProps, { loginUser })(Login);
