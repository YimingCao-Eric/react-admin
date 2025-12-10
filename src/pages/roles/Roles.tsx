/**
 * Roles Page Component
 * 
 * Displays a list of all roles in the system.
 * Allows viewing role details, editing roles, and deleting roles.
 * Provides a link to create new roles.
 */
import React, {useEffect} from 'react';
import Wrapper from "../../components/Wrapper";
import {Link} from "react-router-dom";
import {User} from "../../models/user";
import {Role} from "../../models/role";
import {getRoles} from "@testing-library/dom";
import axios from "axios";

const Roles = () => {
    const [roles, setRoles] = React.useState([]);

    /**
     * Effect hook that fetches all roles on component mount
     */
    useEffect(() => {
        (
            async () =>{
                const {data} = await axios.get("roles");
                setRoles(data as any);
            }
        )();
    }, []);

    /**
     * Deletes a role after user confirmation
     * @param id - The ID of the role to delete
     */
    const del = async (id: number) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await axios.delete(`roles/${id}`);
            setRoles(roles.filter((r:Role) => r.id !== id));
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">
                    Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map((role:Role) => {
                        return (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                           onClick={() => del(role.id)}>
                                            Delete</a>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default Roles;