/**
 * Login Page Component
 * 
 * Authentication page that allows users to log in to the admin panel.
 * Handles email and password input, submits credentials to the API,
 * and redirects to the dashboard upon successful login.
 */
import React, {SyntheticEvent, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    /**
     * Handles form submission for user login
     * @param e - Form submission event
     */
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const {data} = await axios.post("login", {
            email,
            password,
        });
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to="/" />;
    }
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input type="email" className="form-control" placeholder="Email" required
                onChange={e => setEmail(e.target.value)}/>
                <input type= "password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}/>
                <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
            </form>
        </main>
    )
};
export default Login;