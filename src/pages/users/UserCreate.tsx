/**
 * UserCreate Page Component
 * 
 * Form page for creating a new user.
 * Allows users to input user details including name, email, and role assignment.
 * Redirects to users list upon successful creation.
 */
import React, {SyntheticEvent, useEffect} from 'react'
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Role} from "../../models/role";
import {Navigate} from "react-router-dom";

const UserCreate = () => {
    const [first_name, setFirstName] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [role_id, setRoleId] = React.useState("");
    const [roles, setRoles] = React.useState([]);
    const [redirect, setRedirect] = React.useState(false);

    /**
     * Effect hook that loads available roles on component mount
     */
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("/roles");
                setRoles(data as any);
        }
        )()
    }, []);

    /**
     * Handles form submission for creating a new user
     * @param e - Form submission event
     */
    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post("/users", {
                first_name,
                last_name,
                email,
                role_id: parseInt(role_id)
            });
            setRedirect(true);
        } catch (error: any) {
            console.error('Error creating user:', error);
            console.log('Error response:', error.response?.data);
            console.log('Error status:', error.response?.status);

            alert(`Error creating user: ${error.response?.data?.message || 'Check console for details'}`);
        }
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/users" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control" onChange={e=> setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control" onChange={e=> setLastName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control" onChange={e=> setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" onChange={e=> setRoleId(e.target.value)}>
                        {roles.map((r: Role) => {
                            return (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default UserCreate;