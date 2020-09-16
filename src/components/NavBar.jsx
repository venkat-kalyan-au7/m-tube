import React from "react";
import config from "../config";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { setUser, logOut } from "../redux/actions/userActions";

const NavBar = ({ user, setUser, logOut }) => {
  const responseGoogle = response => {
    if (response.error)
      return alert("Something has gone wrong. Please try again");
    const userObj = {
      ...response.profileObj,
      accessToken: response.accessToken
    };
    setUser(userObj);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        mTube
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/playlist">
              Create Playlist +
            </Link>
          </li>
          <li className="nav-item">
            {user === null ? (
              <GoogleLogin
                scope="https://www.googleapis.com/auth/youtube"
                clientId={config.CLIENT_ID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            ) : (
              <GoogleLogout
                clientId={config.CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={logOut}
              />
            )}
          </li>
          {/* <li class="nav-item">
            <a class="nav-link" href="#">
              Pricing
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">
              Disabled
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

const stateMapper = storeState => {
  return {
    user: storeState.userState.user
  };
};

const dispatchMapper = { setUser, logOut };

export default connect(stateMapper, dispatchMapper)(NavBar);
