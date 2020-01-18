import React, { Fragment, useState } from "react";
import "./Navbar.css";
import { connect } from "react-redux";

import SignOut from "../auth/SignOut";
import Alert from "./Alert";
import { unsetCurrentUser } from "../../actions/user.actions";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import { dict } from "../../utils/language";
import LanguageSelect from "./LanguageSelect";

const Navbar = ({ language, currentUser, supervisor, unsetCurrentUser }) => {
  const [hidden, toggleHidden] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  return (
    <Fragment>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              Six-Sigma
            </a>
            <a data-target="mobile-demo" className="sidenav-trigger">
              Click
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="file-dropdown">
                  {dict["File"][language]}
                </a>
              </li>
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="qr-dropdown">
                  QR
                </a>
              </li>
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="user-dropdown">
                  {dict["User"][language]}
                </a>
              </li>
              {!currentUser ? (
                <li>
                  <a href="#" onClick={signInWithGoogle}>
                    {dict["Sign In"][language]}
                  </a>
                </li>
              ) : (
                  <li>
                    <a href="#" onClick={() => toggleHidden(!hidden)}>
                      {currentUser.displayName}
                    </a>
                  </li>
                )}
              {currentUser && currentUser.picture && (
                <li>
                  <img
                    onClick={() => toggleHidden(!hidden)}
                    className="nav-img"
                    src={currentUser.picture}
                  />
                </li>
              )}
            </ul>
          </div>
          <Alert />
        </nav>
      </div>
      {hidden && <SignOut closePopup={toggleHidden} />}

      <ul className="sidenav" id="mobile-demo">
        {currentUser && <li className="username">{currentUser.displayName}</li>}
        <li>
          <a href="/">{dict["Home"][language]}</a>
        </li>
        <li>
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">{dict["File"][language]}</div>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <a href="/new_file">{dict["New File"][language]}</a>
                  </li>
                  <li>
                    <a href="/files">{dict["All Files"][language]}</a>
                  </li>
                  <li>
                    <a href="/reports">{dict["Reports"][language]}</a>
                  </li>
                  <li>
                    <a href="/requests">{dict["Requests"][language]}</a>
                  </li>
                  <li><a href="/new_task">{dict["New Task"][language]}</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">QR</div>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <a href="/generator">{dict["New QRCode"][language]}</a>
                  </li>
                  <li>
                    <a href="/scanner">{dict["QR Scanner"][language]}</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">{dict["User"][language]}</div>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <a href="/users">{dict["All Users"][language]}</a>
                  </li>
                  <li>
                    <a href="/register">
                      {currentUser && currentUser.registered
                        ? dict["Edit Profile"][language]
                        : dict["Register"][language]}
                    </a>
                  </li>
                  {currentUser ? (
                    <button
                      className="sign-out-link"
                      onClick={() => unsetCurrentUser()}>
                      {dict["Sign Out"][language]}
                    </button>
                  ) : (
                      <button onClick={signInWithGoogle}>
                        {dict["Sign In"][language]}
                      </button>
                    )}
                  <li>
                    <a href="/language">{dict["Change Language"][language]}</a>
                  </li>
                  <li>
                    <a href="/stats">{dict["Statistics"][language]}</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <ul id="file-dropdown" className="dropdown-content">
        <li>
          <a href="/new_file">{dict["New File"][language]}</a>
        </li>
        <li>
          <a href="/files">{dict["All Files"][language]}</a>
        </li>
        {
          supervisor &&
          <li>
            <a href="/reports">{dict["Reports"][language]}</a>
          </li>
        }
        <li>
          <a href="/requests">{dict["Requests"][language]}</a>
        </li>
        {
          supervisor &&
          <li><a href="/new_task">{dict["New Task"][language]}</a></li>
        }
      </ul>
      <ul id="user-dropdown" className="dropdown-content">
        <li>
          <a href="/users">{dict["All Users"][language]}</a>
        </li>
        <li>
          <a href="/register">
            {currentUser && currentUser.registered
              ? dict["Edit Profile"][language]
              : dict["Register"][language]}
          </a>
        </li>
        <li>
          <a href="/language">{dict["Change Language"][language]}</a>
        </li>
        {
          supervisor &&
          <li><a href="/stats">{dict["Statistics"][language]}</a></li>
        }
      </ul>
      <ul id="qr-dropdown" className="dropdown-content">
        <li>
          <a href="/generator">{dict["New QRCode"][language]}</a>
        </li>
        <li>
          <a href="/scanner">{dict["QR Scanner"][language]}</a>
        </li>
      </ul>

      <LanguageSelect manualOpen={manualOpen} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  supervisor: state.user.supervisor,
  language: state.user.language
});

export default connect(mapStateToProps, { unsetCurrentUser })(Navbar);
