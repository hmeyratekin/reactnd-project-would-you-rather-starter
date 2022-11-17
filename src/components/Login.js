import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { handleLogin } from "../actions/authedUser";
import { handleReceiveUsers } from "../actions/users";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    userId: null,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleReceiveUsers());
  };

  onLoginChange = (e) => {
    let userId = e.target.value;
    if (userId === "Select") {
      userId = null;
    }
    this.setState(() => ({ userId: userId }));
  };

  onLoginButtonClick = (e) => {
    e.preventDefault();
    const { userId } = this.state;

    if (userId === null) {
      return;
    }
    this.props.dispatch(handleLogin(userId));
  };

  render() {
    const { users } = this.props;
    return (
        <div className="Login-form-container">
          <Form className="Login-form">
            <div className="Login-form-content">
              <h3 className="Login-form-title">Select username to login</h3>
              <Form.Control as="select" onChange={this.onLoginChange} className="me-auto" aria-label="Select an user">
                <option value="Select">Select...</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {" "}{user.name}{" "}
                    </option>
                ))}
              </Form.Control>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary"  onClick={this.onLoginButtonClick}>
                  Login
                </button>
              </div>
            </div>
          </Form>
        </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
};

Login.defaultProps = {
  users: [],
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users),
  };
};


export default connect(mapStateToProps)(Login);