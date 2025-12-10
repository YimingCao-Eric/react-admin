import React, {SyntheticEvent, useEffect} from 'react'
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Role} from "../../models/role";
import {Navigate, useParams} from "react-router-dom";
import {Permission} from "../../models/permission";

const RoleEdit = (props: any) => {
    const [name, setName] = React.useState("");
    const [permissions, setPermissions] = React.useState([]);
    const [selected, setSelected] = React.useState([] as number[]);
    const [redirect, setRedirect] = React.useState(false);
    const { id } = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get("/permissions");
                setPermissions(response.data as any);

                const {data} = await axios.get(`/roles/${id}`);
                setName((data as any).name);
                setSelected((data as any).permissions.map((p: Permission) => p.id));

            }
        )()
    }, []);

    const check = (id: number) => {
        if (selected.some(s => s===id)){
            setSelected(selected.filter(s => s!== id));
            return;
        }
        setSelected([...selected, id]);
    }

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/roles/${id}`, {
                name,
                permissions: selected.map(id => id.toString()),
            });
            setRedirect(true);
        } catch (error: any) {
            console.error('Error creating role:', error);
            console.log('Error response:', error.response?.data);
            console.log('Error status:', error.response?.status);

            alert(`Error creating role: ${error.response?.data?.message || 'Check console for details'}`);
        }
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/roles" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               defaultValue={name}
                               onChange={e=> setName(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.id}>
                                    <input className="form-check-input" type="checkbox"
                                           value={p.id}
                                           checked={selected.some(s => s===p.id)}
                                           onChange = {() => check(p.id)}
                                    />
                                    <label className="form-check-label">{p.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default RoleEdit;