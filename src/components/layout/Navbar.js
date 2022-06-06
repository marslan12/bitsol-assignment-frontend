import React from "react";
import { Link } from "react-router-dom";

import AuthUser from "../../utils/AuthUser";

const Navbar = () => {
    const { token, logout } = AuthUser();

    const logoutUser = () => {
        if (token !== undefined) {
            logout();
        }
    };

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">All Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/add">Add New User</Link>
                        </li>

                    </ul>
                    <ul class="navbar-nav ml-auto">

                        <li className="nav-item">
                            <span role="button" className="nav-link" onClick={() => logoutUser()}>
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

