import React, {SyntheticEvent, useEffect} from 'react'
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Role} from "../../models/role";
import {Navigate, useParams} from "react-router-dom";

const UserEdit = (props:any) => {
    const [first_name, setFirstName] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [role_id, setRoleId] = React.useState("");
    const [roles, setRoles] = React.useState([]);
    const [redirect, setRedirect] = React.useState(false);
    const { id } = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get("/roles");
                setRoles(response.data as any);

                const {data} = await axios.get(`/users/${id}`);
                setFirstName((data as any).first_name);
                setLastName((data as any).last_name);
                setEmail((data as any).email);
                setRoleId((data as any).role_id);

        }
        )()
    }, []);

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/users/${id}`, {
                first_name,
                last_name,
                email,
                role_id: parseInt(role_id)
            });
            setRedirect(true);
        } catch (error: any) {
            console.error('Error editing user:', error);
            console.log('Error response:', error.response?.data);
            console.log('Error status:', error.response?.status);

            alert(`Error editing user: ${error.response?.data?.message || 'Check console for details'}`);
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
                    <input className="form-control"
                           defaultValue={first_name}
                           onChange={e=> setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control"
                           defaultValue={last_name}
                           onChange={e=> setLastName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control"
                           defaultValue={email}
                           onChange={e=> setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control"
                            value={role_id}
                            onChange={e=> setRoleId(e.target.value)}>
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

export default UserEdit;