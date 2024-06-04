import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { registerUser } from "../../actions/auth";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
  };

  componentDidMount() {
    console.log(this.props);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.props.registerUser({ username, email, password });
    this.setState({
      username: "",
      password: "",
      email: "",
      confirm_password: "",
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }

    const { username, password, confirm_password, email } = this.state;

    return (
      <>
        {this.props.loading ? (
          "loading.."
        ) : (
          <>
            <div as="h2" className="text-center text-teal">
              Register New Account
            </div>
            <Form size="large" onSubmit={this.onSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={this.onChange}
                />
              </Form.Group>
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
              <Form.Group controlId="formPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirm_password}
                  name="confirm_password"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Button variant="teal" type="submit" size="lg" block>
                Register
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

export default connect(mapStateToProps, { registerUser })(Register);
