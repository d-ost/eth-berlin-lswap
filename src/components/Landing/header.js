import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                     DOST WALLET
                </Link>
            </li>
        </ul>
    </div>
    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
               <Link className="nav-link" to="/create-wallet">
                   Create Wallet
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/recover-wallet">
                    Recover Wallet
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/friends">
                   Friends
                </Link>
            </li>
        </ul>
    </div>
</nav>
);

export default Header;
