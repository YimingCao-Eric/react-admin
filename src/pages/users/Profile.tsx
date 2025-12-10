import React, {Dispatch, SyntheticEvent, useEffect} from 'react'
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {User} from "../../models/user";
import {connect} from "react-redux";
import {setUser} from "../../redux/actions/setUserAction";

const Profile = (props: {user: User, setUser: (user: User) => void}) => {
    const [first_name, setFirstName] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password_confirm, setPasswordConfirm] = React.useState("");

    useEffect(() => {
        setFirstName(props.user.first_name);
        setLastName(props.user.last_name);
        setEmail(props.user.email);
    }, []);

    const infoSubmit = async (e: SyntheticEvent)=>{
        e.preventDefault();
        const {data} =  await axios.put(`/users/info`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
        });
        props.setUser(new User(
            (data as any).id,
            (data as any).email,
            (data as any).first_name,
            (data as any).last_name,
            (data as any).role,
        ));
    }

    const passwordSubmit = async (e: SyntheticEvent)=>{
        e.preventDefault();
        await axios.put(`/users/info`, {
            password: password,
            password_confirm: password_confirm,
        });
    }

    return (
        <Wrapper>
            <h3>Account Infomation</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control"
                           defaultValue={first_name}
                           onChange={e => setFirstName(e.target.value)}>
                    </input>
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control"
                           defaultValue={last_name}
                           onChange={e => setLastName(e.target.value)}>
                    </input>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control"
                           defaultValue={email}
                           onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <button className="btn btn_outline_secondary">Save</button>
            </form>
            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <label>Password</label>
                    <input className="form-control"
                           onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input className="form-control"
                           onChange={e => setPasswordConfirm(e.target.value)}>
                    </input>
                </div>
                <button className="btn btn_outline_secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default connect(
    (state: {user: User}) => {
        return {
            user: state.user,
        }
    }, (dispatch: Dispatch<any>) => {
        return {
            setUser: (user: User) => dispatch(setUser(user)),
        }
    }
)(Profile);