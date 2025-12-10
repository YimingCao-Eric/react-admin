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

const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);