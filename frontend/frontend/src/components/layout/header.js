import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";

export class Header extends Component {
  render() {
    return (
      <div>
        <Nav
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <Nav.Link href="/home">Simple To-Do</Nav.Link>
          </Nav.Item>
          {this.props.auth.isAuthenticated ? (
            <>
              <Nav.Item>
                <Nav.Link>{this.props.auth.user.username}</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => this.props.logoutUser()}>
                <Nav.Link eventKey="logout">Logout</Nav.Link>
              </Nav.Item>
            </>
          ) : (
            ""
          )}
        </Nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.authReducer,
});
export default connect(mapStateToProps, { logoutUser })(Header);
