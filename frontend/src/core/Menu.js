import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from "../auth/helper/index"


const currentTab = (history, path) => {

    if(history.location.pathname === path)
        return { color: "#2ecc72" };
    else
        return { color: "#FFFFFF" };
}


function Menu ({ history }) {

    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link 
                        style={ currentTab(history, "/") } 
                        className="nav-link" to = "/"> 
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        style={ currentTab(history, "/cart") } 
                        className="nav-link" to = "/cart"
                        > 
                        Cart
                    </Link>
                </li>
                {isAuthenticated() && (
                    <li className="nav-item">
                        <Link 
                            style={ currentTab(history, "/user/dashboard") } 
                            className="nav-link" to = "/user/dashboard"> 
                            User Dashboard
                        </Link>
                    </li>
                )}
                { isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            style={ currentTab(history, "/admin/dashboard") } 
                            className="nav-link" to = "/admin/dashboard">
                            Admin Dashboard
                        </Link>
                    </li>
                )}
                { !isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link
                                style={ currentTab(history, "/signin") } 
                                className="nav-link" 
                                to = "/signin">
                                sign in
                            </Link>
                        </li> 

                        <li className="nav-item">
                            <Link
                                style={ currentTab(history, "/signup") } 
                                className="nav-link" 
                                to = "/signup">
                                sign up
                            </Link>
                        </li>
                    </Fragment>
                    )
                }
                { isAuthenticated() && 
                    <li className="nav-item">
                        <span
                            style={ currentTab(history, "/signout") } 
                            className="nav-link text-warning" 
                            onClick = { () => {
                                signout(() => {
                                    history.push("/")
                                })
                            }}
                        >
                                signout
                
                        </span>
                    </li>
                }
            </ul>
        </div>

    );
}

export default withRouter(Menu) ;