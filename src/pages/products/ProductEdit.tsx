import React, {SyntheticEvent, useRef, useEffect} from 'react'
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Role} from "../../models/role";
import {Navigate, useParams} from "react-router-dom";
import {Permission} from "../../models/permission";
import ImageUpload from "../../components/ImageUpload";

const ProductEdit = (props: any) => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState("");
    const [price, setPrice] = React.useState("");
    const { id } = useParams();

    const [redirect, setRedirect] = React.useState(false);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`/products/${id}`);
                setTitle((data as any).title);
                setDescription((data as any).description);
                setImage((data as any).image);
                setPrice((data as any).price);
            }
        )()
    }, []);

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/products/${id}`, {
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

    const updateImage = (url:string) => {
        if (ref.current) {
            ref.current.value = url;
        }
        setImage(url);
    }

    if (redirect) {
        return <Navigate to="/products" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control"
                           defaultValue={title}
                           onChange={e=> setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control"
                              defaultValue={description}
                              onChange={e=> setDescription(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input className="form-control"
                               ref = {ref}
                               defaultValue={image}
                               onChange={e=> setImage(e.target.value)}/>
                        <ImageUpload uploaded={updateImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input className="form-control"
                           defaultValue={price}
                           onChange={e=> setPrice(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductEdit;