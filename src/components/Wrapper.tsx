/**
 * Wrapper Component
 * 
 * Layout wrapper component that provides the main structure for authenticated pages.
 * Handles authentication checking, displays loading state, and redirects to login
 * if the user is not authenticated. Includes the Nav and Menu components and
 * wraps page content in the main content area.
 */
import React, {useEffect, useState, Dispatch} from "react";
import Nav from "./Nav";
import Menu from "./Menu";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";

const Wrapper = (props: any) =>{
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    /**
     * Effect hook that runs on component mount to check user authentication
     * Fetches current user data and updates Redux store, or redirects to login if unauthorized
     */
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const {data} = await axios.get("user");
                setLoading(false);

                props.setUser(new User(
                    (data as any).id,
                    (data as any).email,
                    (data as any).first_name,
                    (data as any).last_name,
                    (data as any).role,
                ));
            } catch (e: any) {
                setLoading(false);
                setRedirect(true);

            }
        };

        checkAuth().catch(error => {
            setLoading(false);
            setRedirect(true);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (redirect) {
        console.log("Redirecting to login");
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <Menu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
}

/**
 * Maps Redux state to component props
 */
const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user,
    }
}

/**
 * Maps Redux dispatch actions to component props
 */
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);