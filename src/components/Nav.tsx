/**
 * Nav Component
 * 
 * Top navigation bar component that displays the company name and user information.
 * Includes a link to the user's profile and a sign out button.
 * Connected to Redux store to access current user information.
 */
import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {User} from "../models/user";

const Nav = (props: {user: User}) => {

    /**
     * Handles user logout by sending a POST request to the logout endpoint
     */
    const logout = async () => {
        await axios.post("logout", {});
    }
        return (
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
                <ul className="my-2 my-md-0 mr-md-3">
                    <Link to="/profile" className="p-2 text-white text-decoration-none">{props.user.name}</Link>
                    <Link to="/login" className="p-2 text-white text-decoration-none" onClick={logout} >Sign out</Link>
                </ul>
            </header>
        )

}


export default connect(
    (state: {user: User}) => {
        return {
            user: state.user,
        }
    }
)(Nav);