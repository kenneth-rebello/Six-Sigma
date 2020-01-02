import React, { Fragment } from 'react';
import './Navbar.css'

const Navbar = () => {

    return (
        <Fragment>
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">File-Tracker</a>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger">Click</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/generator">New File</a></li>
                            <li><a href="/scanner">Scanner</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <ul className="sidenav" id="mobile-demo">
                <li><a href="/generator">New File</a></li>
                <li><a href="/scanner">Scanner</a></li>
            </ul>
        </Fragment>
    )
}

export default Navbar;