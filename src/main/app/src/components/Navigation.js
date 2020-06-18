/* @flow */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Navigation.less';

import { logout } from '../data/modules/auth';

type Props = {
  logout: () => void,
  history: {
    push: (path: string) => void
  }
};

class Navigation extends React.Component<Props> {
  handleSignOut() {
    axios.post('/api/signout')
      .then(
        (/* success*/) => {
          this.props.logout();
          this.props.history.push('/');
        },
        failure => console.error(`Failed to log out successfully: ${failure}`)
      );
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand"><img className="logo" alt="HashiCorp Logo" src="/static/hashicorp.svg" /></Link>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = { logout };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
