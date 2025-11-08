import React, {SyntheticEvent, useEffect} from 'react'
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Role} from "../../models/role";
import {Navigate} from "react-router-dom";
import {Permission} from "../../models/permission";
import ImageUpload from "../../components/ImageUpload";

const ProductCreate = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState("");
    const [price, setPrice] = React.useState("");

    const [redirect, setRedirect] = React.useState(false);

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post(`/products`, {
                title,
                description,
                image,
                price: parseFloat(price),
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
        return <Navigate to="/products" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control" onChange={e=> setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" onChange={e=> setDescription(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input className="form-control"
                               value={image}
                               onChange={e=> setImage(e.target.value)}/>
                        <ImageUpload uploaded={setImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input className="form-control" onChange={e=> setPrice(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductCreate;